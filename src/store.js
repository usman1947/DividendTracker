import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import testReducer from 'services/testSlice.js'
import holdingSlice from 'services/holdingSlice.js'

export const store = configureStore({
  reducer: {
    test: testReducer,
    holdings: holdingSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

setupListeners(store.dispatch)