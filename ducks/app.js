import {call, put, takeEvery} from 'redux-saga/effects'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

import {makeAction, createReducer} from './helper'

export const SEARCH = 'SEARCH'
export const GEOCODE = 'GEOCODE'
export const ADD_PIN = 'ADD_PIN'

export const search = makeAction(SEARCH)
export const geocode = makeAction(GEOCODE)
export const addPin = makeAction(ADD_PIN)

export function* geocodeSaga({payload: address}) {
  const result = yield call(geocodeByAddress, address)
  console.log(address)

  const position = yield call(getLatLng, result[0])
  console.log(position)

  yield put(addPin(position))
}

export function* appWatcherSaga() {
  yield takeEvery(GEOCODE, geocodeSaga)
}

const initial = {
  search: '',
  pins: []
}

export default createReducer(initial, state => ({
  ADD_PIN: pin => ({...state, pins: [...state.pins, pin]}),
  SEARCH: text => ({...state, search: text})
}))
