import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const holdingSlice = createSlice({
  name: 'holdings',
  initialState,
  reducers: {
    fetchHoldings: (state, action) => {
      state.value = action.payload
    },
    updateHoldings: (state, action) => {
      let updatedObj = state.value.find(o => o._id === action.payload.id)
      Object.assign(updatedObj, action.payload.updatedObject)
    },
    isFetching: (state, action) => {
      state.isFetching = action.payload
    }
  },
});

export const { fetchHoldings, isFetching, updateHoldings } = holdingSlice.actions;

export const selectHoldings = (state) => state.holdings.value;
export const isFetchingHoldings = (state) => state.holdings.isFetching;

export default holdingSlice.reducer;
