import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import testReducer from 'services/testSlice.js'
import holdingSlice from 'services/holdingSlice.js'
import { alphaAdvantageApi } from 'services/alphaAdvantage'

export const store = configureStore({
  reducer: {
    test: testReducer,
    holdings: holdingSlice,
    [alphaAdvantageApi.reducerPath]: alphaAdvantageApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(alphaAdvantageApi.middleware)
})

setupListeners(store.dispatch)