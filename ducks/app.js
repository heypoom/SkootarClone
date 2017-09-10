import {makeAction, createReducer} from './helper'

export const SET_LOCATION = 'SET_LOCATION'

export const setLocation = makeAction(SET_LOCATION)

const initial = {
  location: null
}

export default createReducer(initial, state => ({
  SET_LOCATION: location => ({
    ...state,
    location
  })
}))
