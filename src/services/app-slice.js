import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        isLoading: false,
    },
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.value.isLoading = action.payload
        },
        setError: (state, action) => {
            state.value.error = action.payload
        },
        setIsLoggedIn: (state, action) => {
            state.value.isLoggedIn = action.payload
        },
    },
})

export const { setIsLoading, setError, setIsLoggedIn } = appSlice.actions

export const isLoading = (state) => state.app.value.isLoading
export const errorMsg = (state) => state.app.value.error
export const isLoggedIn = (state) => state.app.value.isLoggedIn

export default appSlice.reducer
