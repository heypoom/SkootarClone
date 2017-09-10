import {call, put, takeEvery} from 'redux-saga/effects'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

import {makeAction, createReducer} from './helper'

export const SEARCH = 'SEARCH'
export const NEW_PLACE = 'NEW_PLACE'
export const GEOCODE = 'GEOCODE'
export const ADD_PIN = 'ADD_PIN'

export const search = makeAction(SEARCH, 'text', 'index')
export const newPlace = makeAction(NEW_PLACE)
export const geocode = makeAction(GEOCODE)
export const addPin = makeAction(ADD_PIN)

export function* geocodeSaga({payload: address}) {
  const result = yield call(geocodeByAddress, address)
  const position = yield call(getLatLng, result[0])

  yield put(addPin(position))
}

export function* appWatcherSaga() {
  yield takeEvery(GEOCODE, geocodeSaga)
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
