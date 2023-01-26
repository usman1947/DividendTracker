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
  },
});

export const { fetchHoldings } = holdingSlice.actions;

export const selectHoldings = (state) => state.holdings.value;

export default holdingSlice.reducer;
