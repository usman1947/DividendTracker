import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {},
}

export const holdingSlice = createSlice({
    name: 'holdings',
    initialState,
    reducers: {
        addHoldingsData: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { addHoldingsData } = holdingSlice.actions

export const selectHoldingData = (state) => state.holdings.value

export default holdingSlice.reducer
