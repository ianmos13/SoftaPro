import { combineReducers, configureStore } from '@reduxjs/toolkit'
import serviceReducer from './serviceSlice'

const rootReducer = combineReducers({
	service: serviceReducer,
})

const store = configureStore({
	reducer: rootReducer,
})

export default store
