import Router from 'next/router'
import {call, put, select, takeEvery} from 'redux-saga/effects'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

import {makeAction, createReducer, remove, change} from './helper'

/* eslint no-undef: 0 */

// Actions
export const SEARCH = 'SEARCH'
export const NEW_PLACE = 'NEW_PLACE'

export const SET_LOCATION = 'SET_LOCATION'
export const SET_PIN = 'SET_PIN'
export const REMOVE_PIN = 'REMOVE_PIN'

export const COMPUTE_TOTAL_PATHS = 'COMPUTE_TOTAL_PATHS'
export const SET_TOTAL_PATHS = 'SET_TOTAL_PATHS'

export const TO_SUMMARY = 'TO_SUMMARY'

// Action Creators
export const search = makeAction(SEARCH, 'text', 'index')
export const newPlace = makeAction(NEW_PLACE)

export const setLocation = makeAction(SET_LOCATION, 'index', 'address')
export const setPin = makeAction(SET_PIN, 'position', 'index')
export const removePin = makeAction(REMOVE_PIN)

export const computeTotalPaths = makeAction(COMPUTE_TOTAL_PATHS)
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

// Geocodes the location from the places dropdown.
export function* locationSaga({payload: {index, address}}) {
  const result = yield call(geocodeByAddress, address)
  const position = yield call(getLatLng, result[0])
  const formatted = result[0].formatted_address

  // Side Effect: Adds a new map pin using the retrieved coordinates.
  yield put(setPin({...position, address: formatted, name: address}, index))

  // Side Effect: Re-compute the total distances/durations everytime a new pin is added.
  yield put(computeTotalPaths())
}

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

// Calculates the trip distance and duration using the polyline.
export function* computeTotalSaga() {
  // Retrieves the pins from the store
  const pins = (yield select(state => state.app.pins) || []).filter(pin => pin)

  // If there are more than 1 pins, retrieve the distance.
  if (google && pins.length > 1) {
    // Slices the origin, destination and waypoints from the pins.
    const origin = pins[0]
    const destination = pins[pins.length - 1]
    const waypoints = pins.slice(1, pins.length - 1)

    // Configure the Google Maps Direction Services API
    // We'll use this instead of the Distance Matrix, so we can use the waypoints.

    const config = {
      origin: new google.maps.LatLng(origin.lat, origin.lng),
      destination: new google.maps.LatLng(destination.lat, destination.lng),
      waypoints: waypoints.map(pin => ({
        location: new google.maps.LatLng(pin.lat, pin.lng)
      })),
      travelMode: 'DRIVING'
    }

    const directions = yield call(computeRoutes, config)
    const {routes} = directions
    console.log('Directions:', directions)

    if (routes) {
      // Retrieve the distance in km, and duration in minutes
      const paths = routes.map(legSelector).reduce(flatten, [])
      const distance = (totalDistance(paths) / 1000).toFixed(2)
      const duration = Math.round(totalDuration(paths) / 60)

      yield put(setTotalPaths(distance, duration))
    }
  }
}

export function* appWatcherSaga() {
  yield takeEvery(SET_LOCATION, locationSaga)
  yield takeEvery(COMPUTE_TOTAL_PATHS, computeTotalSaga)
  yield takeEvery(TO_SUMMARY, toSummarySaga)
}

const initial = {
  search: ['', ''],
  pins: [],
  distance: 0,
  duration: 0
}

export default createReducer(initial, state => ({
  [SET_PIN]: ({position, index}) => ({
    ...state,
    pins: change(index, position, state.pins)
  }),
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
  })
}))
