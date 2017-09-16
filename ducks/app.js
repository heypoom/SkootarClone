import Router from 'next/router'
import Polyline from '@mapbox/polyline'
import {call, put, select, takeEvery} from 'redux-saga/effects'

import {makeAction, createReducer, remove, change} from './helper'

/* eslint no-undef: 0 */

// Actions
export const SEARCH = 'SEARCH'
export const NEW_PLACE = 'NEW_PLACE'

export const SET_LOCATION = 'SET_LOCATION'
export const SET_PIN = 'SET_PIN'
export const SET_PINS = 'SET_PINS'
export const REMOVE_PIN = 'REMOVE_PIN'

export const SET_POLYLINE = 'SET_POLYLINE'
export const SET_TOTAL_PATHS = 'SET_TOTAL_PATHS'

export const TO_SUMMARY = 'TO_SUMMARY'

// Action Creators
export const search = makeAction(SEARCH, 'text', 'index')
export const newPlace = makeAction(NEW_PLACE)

export const setLocation = makeAction(SET_LOCATION, 'index', 'address')
export const setPin = makeAction(SET_PIN, 'position', 'index')
export const setPins = makeAction(SET_PINS)
export const removePin = makeAction(REMOVE_PIN)

export const setPolyline = makeAction(SET_POLYLINE)
export const setTotalPaths = makeAction(SET_TOTAL_PATHS, 'distance', 'duration')

export const toSummary = makeAction(TO_SUMMARY)

// Selects only the distance and duration
const legSelector = route =>
  route.legs.map(leg => ({
    distance: leg.distance.value,
    duration: leg.duration.value
  }))

// Flatten the array
const flatten = (acc, cur) => acc.concat(cur)

// Get the sum of distances and durations
const sum = key => paths =>
  paths.map(x => x[key]).reduce((prev, cur) => prev + cur)

const totalDistance = sum('distance')
const totalDuration = sum('duration')

const computeRoutes = config =>
  new Promise((resolve, reject) => {
    if (google) {
      const directions = new google.maps.DirectionsService()

      directions.route(config, (res, status) => {
        status !== 'OK' ? reject(status) : resolve(res)
      })
    } else {
      reject(new Error('Google Maps not in scope'))
    }
  })

// Checks if the locations are set, then navigate to summary view.
export function* toSummarySaga() {
  const pins = yield select(s => s.app.pins)

  if (pins.length > 1) {
    yield call(Router.push, '/order')
  } else {
    alert('Please select 2 or more locations.')
  }
}

// Handles location changes in the application
export function* locationSaga({payload: {index, address}}) {
  // Retrieves the places from the search boxes
  // prettier-ignore
  const places = (yield select(state => state.app.search) || []).filter(pin => pin)

  // Slices the origin, destination and waypoints from the places.
  const origin = places[0]
  const destination = places[places.length - 1]
  const waypoints = places.slice(1, places.length - 1)

  console.log('Searches', {origin, destination, waypoints})

  // Configure the Google Maps Direction Services API
  const config = {
    origin,
    destination,
    waypoints: waypoints.map(location => ({location})),
    travelMode: 'DRIVING'
  }

  const directions = yield call(computeRoutes, config)
  const {routes} = directions

  if (routes[0]) {
    // Update the total distance in km, and duration in minutes
    const paths = routes.map(legSelector).reduce(flatten, [])
    const distance = (totalDistance(paths) / 1000).toFixed(2)
    const duration = Math.round(totalDuration(paths) / 60)

    yield put(setTotalPaths(distance, duration))

    // Retrieve the coordinates required for markers
    const legs = routes[0].legs
    const dest = legs[legs.length - 1]

    const coords = [
      ...legs.map((leg, index) => ({
        address: leg.start_address,
        lat: leg.start_location.lat(),
        lng: leg.start_location.lng()
      })),
      {
        address: dest.end_address,
        lat: dest.end_location.lat(),
        lng: dest.end_location.lng()
      }
    ]

    const pins = coords.map((coord, index) => ({
      ...coord,
      name: places[index]
    }))

    // Adds a new map pin using the retrieved coordinates.
    yield put(setPins(pins))

    // Decodes the polyline, then render it into the map
    const poly = yield call(Polyline.decode, routes[0].overview_polyline)
    const lines = poly.map(line => new google.maps.LatLng(line[0], line[1]))
    yield put(setPolyline(lines))
  }
}

// Geocodes the location from the places dropdown. Unused.
export function* geocodeSaga() {
  // import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
  // const result = yield call(geocodeByAddress, address)
  // const position = yield call(getLatLng, result[0])
  // const formatted = result[0].formatted_address
  //
  // Adds a new map pin using the retrieved coordinates.
  // yield put(setPin({...position, address: formatted, name: address}, index))
}

export function* appWatcherSaga() {
  yield takeEvery(SET_LOCATION, locationSaga)
  yield takeEvery(TO_SUMMARY, toSummarySaga)
}

const initial = {
  search: ['', ''],
  pins: [],
  distance: 0,
  duration: 0,
  polyline: null
}

export default createReducer(initial, state => ({
  [SET_PIN]: ({position, index}) => ({
    ...state,
    pins: change(index, position, state.pins)
  }),
  [SET_PINS]: pins => ({...state, pins}),
  [REMOVE_PIN]: index => {
    if (state.search.length > 1) {
      return {
        ...state,
        pins: remove(index, state.pins),
        search: remove(index, state.search)
      }
    }
    return state
  },
  [NEW_PLACE]: () => ({
    ...state,
    search: [...state.search, '']
  }),
  [SEARCH]: ({text, index}) => ({
    ...state,
    search: change(index, text, state.search)
  }),
  [SET_TOTAL_PATHS]: ({distance, duration}) => ({
    ...state,
    distance,
    duration
  }),
  [SET_POLYLINE]: polyline => ({...state, polyline})
}))
