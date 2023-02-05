import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const marketDataSlice = createSlice({
  name: 'marketData',
  initialState,
  reducers: {
    addMarketData: (state, action) => {
        state.value = action.payload
    },
  },
});

export const { addMarketData } = marketDataSlice.actions;

export const selectMarketData = (state) => state.marketData.value;

export default marketDataSlice.reducer;
