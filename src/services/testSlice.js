import { createSlice } from '@reduxjs/toolkit'

export const initialState = []

export const testSlice = createSlice({
    name: 'testReducers',
    initialState,
    reducers: {
        clear: () => [],
        addName: ( state, action) => {
            state.push(action.payload)
        }
    }
})

export const { clear, addName } = testSlice.actions

export default testSlice.reducer