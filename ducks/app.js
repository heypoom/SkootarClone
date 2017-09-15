import axios from 'axios'
import {call, put, select, takeEvery} from 'redux-saga/effects'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import polyline from '@mapbox/polyline'

import {GMAPS_API_KEY} from '../core/index'
import {makeAction, createReducer} from './helper'

/* eslint no-undef: 0 */

// Actions
export const SEARCH = 'SEARCH'
export const NEW_PLACE = 'NEW_PLACE'

export const GEOCODE = 'GEOCODE'
export const ADD_PIN = 'ADD_PIN'

export const COMPUTE_DISTANCE = 'COMPUTE_DISTANCE'
export const SET_DISTANCE = 'SET_DISTANCE'

// Action Creators
export const search = makeAction(SEARCH, 'text', 'index')
export const newPlace = makeAction(NEW_PLACE)

export const geocode = makeAction(GEOCODE)
export const addPin = makeAction(ADD_PIN)

export const computeDistance = makeAction(COMPUTE_DISTANCE)
export const setDistance = makeAction(SET_DISTANCE)

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
export function* geocodeSaga({payload: address}) {
  const result = yield call(geocodeByAddress, address)
  const position = yield call(getLatLng, result[0])

  // Side Effect: Adds a new map pin using the retrieved coordinates.
  yield put(addPin(position))

  // Side Effect: Re-compute the distance everytime a new pin is added.
  yield put(computeDistance())
}

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
    const directions = new google.maps.DirectionsService()
    const config = {
      origin: new google.maps.LatLng(origin.lat, origin.lng),
      destination: new google.maps.LatLng(destination.lat, destination.lng),
      waypoints: waypoints.map(pin => ({
        location: new google.maps.LatLng(pin.lat, pin.lng)
      })),
      travelMode: 'DRIVING'
    }

    const callback = ({routes}, status) => {
      if (status !== 'OK') {
        console.warn(status)
      } else {
        if (routes) {
          const paths = routes.map(legSelector).reduce(flatten, [])
          const distance = Math.round(totalDistance(paths) / 1000)
          const duration = Math.round(totalDuration(paths) / 60)

          console.log(paths)

          console.log(`Distance: ${distance}km Duration: ${duration}min`)
        }
      }
    }

    yield call(directions.route, config, callback)
  }
}

export function* appWatcherSaga() {
  yield takeEvery(GEOCODE, geocodeSaga)
  yield takeEvery(COMPUTE_DISTANCE, distanceSaga)
}

const initial = {
  search: ['', ''],
  pins: []
}

export default createReducer(initial, state => ({
  [ADD_PIN]: pin => ({...state, pins: [...state.pins, pin]}),
  [NEW_PLACE]: () => ({...state, search: [...state.search, '']}),
  [SEARCH]: ({text, index}) => {
    // TODO: Update the search without mutating.
    const search = state.search
    search[index] = text
    return {...state, search: [...search]}
  }
}))
