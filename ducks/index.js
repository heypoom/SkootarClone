import {createStore, combineReducers} from 'redux'
import app from './app'

export const reducers = combineReducers({app})
const store = createStore(reducers)

export default store
