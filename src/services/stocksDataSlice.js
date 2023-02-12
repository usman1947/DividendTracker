import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const stocksDataSlice = createSlice({
  name: 'stocksData',
  initialState,
  reducers: {
    addStocksData: (state, action) => {
        state.value = action.payload
    },
  },
});

export const { addStocksData } = stocksDataSlice.actions;

export const selectMarketData = (state) => state.stocksData.value;

export default stocksDataSlice.reducer;
