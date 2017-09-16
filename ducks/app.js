import {call, put, select, takeEvery} from 'redux-saga/effects'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

import {makeAction, createReducer} from './helper'

/* eslint no-undef: 0 */

// Actions
export const SEARCH = 'SEARCH'
export const NEW_PLACE = 'NEW_PLACE'

export const SET_LOCATION = 'SET_LOCATIOn'
export const SET_PIN = 'SET_PIN'

export const COMPUTE_TOTAL_PATHS = 'COMPUTE_TOTAL_PATHS'
export const SET_TOTAL_PATHS = 'SET_TOTAL_PATHS'

// Action Creators
export const search = makeAction(SEARCH, 'text', 'index')
export const newPlace = makeAction(NEW_PLACE)

export const setLocation = makeAction(SET_LOCATION, 'index', 'address')
export const setPin = makeAction(SET_PIN, 'position', 'index')

export const computeTotalPaths = makeAction(COMPUTE_TOTAL_PATHS)
export const setTotalPaths = makeAction(SET_TOTAL_PATHS, 'distance', 'duration')

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

  // Side Effect: Adds a new map pin using the retrieved coordinates.
  yield put(setPin(position, index))

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

// Calculates the trip distance using the polyline.
export function* distanceSaga() {
  // Retrieves the pins from the store
  const pins = yield select(state => state.app.pins) || []

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

    const {routes} = yield call(computeRoutes, config)

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
  yield takeEvery(COMPUTE_TOTAL_PATHS, distanceSaga)
}

const initial = {
  search: ['', ''],
  pins: [],
  distance: 0,
  duration: 0
}

export default createReducer(initial, state => ({
  [SET_PIN]: ({position, index}) => {
    const pins = state.pins
    pins[index] = position

    return {...state, pins: [...pins]}
  },
  [NEW_PLACE]: () => ({
    ...state,
    search: [...state.search, '']
  }),
  [SEARCH]: ({text, index}) => {
    // TODO: Update the search without mutating.
    const search = state.search
    search[index] = text

    return {...state, search: [...search]}
  },
  [SET_TOTAL_PATHS]: ({distance, duration}) => ({
    ...state,
    distance,
    duration
  })
}))
