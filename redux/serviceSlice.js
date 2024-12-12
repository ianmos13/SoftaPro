import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	headerText: '',
	infoText: '',
	theme: 'default',
}

const serviceSlice = createSlice({
	name: 'service',
	initialState,
	reducers: {
		setHeaderText: (state, action) => {
			state.headerText = action.payload
		},
		setInfoText: (state, action) => {
			state.infoText = action.payload
		},
		setTheme: (state, action) => {
			state.theme = action.payload
		},
	},
})

export const { setHeaderText, setInfoText, setTheme } = serviceSlice.actions
export default serviceSlice.reducer
