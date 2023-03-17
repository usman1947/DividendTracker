import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        isLoading: true,
    },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
        state.value.isLoading = action.payload
    },
  },
});

export const { setIsLoading } = appSlice.actions;

export const isLoading = (state) => state.app.value.isLoading;

export default appSlice.reducer;
