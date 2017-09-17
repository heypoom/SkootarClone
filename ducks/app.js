import Router from 'next/router'
import Polyline from '@mapbox/polyline'
import {call, put, select, takeEvery} from 'redux-saga/effects'

import {
  createAction,
  createReducer,
  Creator,
  remove,
  change,
  sum,
  flatten
} from './helper'

/* global google */

// Namespaces the action: 'APP/ACTION_NAME'
const A = createAction('APP')

// Actions
export const SEARCH = A('SEARCH')
export const NEW_PLACE = A('NEW_PLACE')

export const UPDATE_LOCATION = A('UPDATE_LOCATION')
export const SET_PIN = A('SET_PIN')
export const SET_PINS = A('SET_PINS')
export const REMOVE_PIN = A('REMOVE_PIN')

export const SET_POLYLINE = A('SET_POLYLINE')
export const SET_TOTAL = A('SET_TOTAL')
export const SET_CENTER = A('SET_CENTER')

export const TOGGLE_EXTRAS = A('TOGGLE_EXTRAS')
export const TOGGLE_EXTRAS_MODAL = A('TOGGLE_EXTRAS_MODAL')
export const SET_RECIPIENT = A('SET_RECIPIENT')
export const TO_SUMMARY = A('TO_SUMMARY')

// Action Creators
export const search = Creator(SEARCH, 'text', 'index')
export const newPlace = Creator(NEW_PLACE)

export const updateLocation = Creator(UPDATE_LOCATION)
export const setPin = Creator(SET_PIN, 'position', 'index')
export const setPins = Creator(SET_PINS)

export const removePin = Creator(REMOVE_PIN)
export const setCenter = Creator(SET_CENTER, 'lat', 'lng')

export const toggleExtras = Creator(TOGGLE_EXTRAS)
export const toggleExtrasModal = Creator(TOGGLE_EXTRAS_MODAL)
export const setRecipient = Creator(SET_RECIPIENT, 'index', 'field', 'value')
export const toSummary = Creator(TO_SUMMARY)

// Selects only the distance and duration
// prettier-ignore
const legSelector = route => route.legs.map(leg => ({
  distance: leg.distance.value,
  duration: leg.duration.value
}))

// Get the sum of distances and durations
const totalDistance = sum('distance')
const totalDuration = sum('duration')

// Compute the total distance and duration for the entire trip
export const computeTotals = routes => {
  const paths = routes.map(legSelector).reduce(flatten, [])
  const distance = (totalDistance(paths) / 1000).toFixed(2)
  const duration = Math.round(totalDuration(paths) / 60)

  return {type: SET_TOTAL, payload: {distance, duration}}
}

// Decodes the polyline, then render it onto the map
// prettier-ignore
export const renderPolyline = data => ({
  type: SET_POLYLINE,
  payload: Polyline.decode(data).map(pos => new google.maps.LatLng(pos[0], pos[1]))
})

// Retrieve the marker coordinates, then puts the marker onto the map.
export const renderMarkers = (legs, places) => {
  // Extract the coordinates required for markers
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

  // Adds the names from the search box
  const pins = coords.map((coord, index) => ({
    ...coord,
    name: places[index]
  }))

  // Adds a new map pin using the retrieved coordinates.
  return setPins(pins)
}

// Promise Wrapper for Google Maps' Directions Services
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
    window.alert('Please select 2 or more locations.')
  }
}

// Handles location changes in the application
export function* locationSaga() {
  // Retrieve the addresses from the search boxes and filter out blank items
  const places = (yield select(state => state.app.search) || []).filter(x => x)

  // Retrieve the origin, destination and waypoints from lists of places.
  const origin = places[0]
  const destination = places[places.length - 1]
  const waypoints = places
    .slice(1, places.length - 1)
    .map(location => ({location}))

  // Invoke the Google Maps Direction Services API with the addresses
  const config = {origin, destination, waypoints, travelMode: 'DRIVING'}
  const {routes} = yield call(computeRoutes, config)
  const route = routes[0]

  if (route) {
    // Update the total distance and duration
    yield put(computeTotals(routes))

    // Display the pins on the map
    yield put(renderMarkers(route.legs, places))

    // Display the polyline paths on the map
    yield put(renderPolyline(route.overview_polyline))
  }
}

// Geocodes the location from the places dropdown.
// This is replaced by the computeMarkers function,
// which does not require an additional network overhead.
export function* geocodeSaga() {
  // import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
  // const result = yield call(geocodeByAddress, address)
  // const position = yield call(getLatLng, result[0])
  // const formatted = result[0].formatted_address
  //
  // Adds a new map pin using the retrieved coordinates.
  // yield put(setPin({...position, address: formatted, name: address}, index))
}

// Promise Wrapper for Geolocation API
const getPosition = () =>
  new Promise((resolve, reject) => {
    if (typeof navigator !== 'undefined') {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(resolve, reject)
      }
      reject(new Error('Geolocation is not supported on this browser'))
    }
    resolve({coords: {latitude: 13, longitude: 100}})
  })

// Gets the users' location
export function* geolocateSaga() {
  const {coords: {latitude, longitude}} = yield call(getPosition)
  yield put(setCenter(latitude, longitude))
}

export function* appWatcherSaga() {
  yield call(geolocateSaga)

  yield takeEvery(UPDATE_LOCATION, locationSaga)
  yield takeEvery(TO_SUMMARY, toSummarySaga)
}

const initial = {
  search: ['', ''],
  center: [13.7, 100.5],
  pins: [],
  distance: 0,
  duration: 0,
  polyline: null,
  extras: {},
  recipients: [],
  extrasModal: false
}

export default createReducer(initial, state => ({
  [SET_PIN]: ({position, index}) => ({
    ...state,
    pins: change(index, position, state.pins)
  }),
  [SET_PINS]: pins => ({
    ...state,
    pins
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
  [SET_TOTAL]: ({distance, duration}) => ({
    ...state,
    distance,
    duration
  }),
  [SET_POLYLINE]: polyline => ({
    ...state,
    polyline
  }),
  [SET_CENTER]: ({lat, lng}) => ({
    ...state,
    center: [lat, lng]
  }),
  [TOGGLE_EXTRAS]: item => ({
    ...state,
    extras: {
      ...state.extras,
      [item]: !state.extras[item]
    }
  }),
  [TOGGLE_EXTRAS_MODAL]: () => ({
    ...state,
    extrasModal: !state.extrasModal
  }),
  [SET_RECIPIENT]: ({index, field, value}) => ({
    ...state,
    recipients: change(index, {[field]: value}, state.recipients)
  })
}))
