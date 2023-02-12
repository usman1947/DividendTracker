import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import testReducer from 'services/testSlice.js'
import holdingSlice from 'services/holdingSlice.js'
import marketDataSlice from 'services/marketDataSlice.js'
import stocksDataSlice from 'services/stocksDataSlice.js'
import { api } from 'services/api'

export const store = configureStore({
  reducer: {
    test: testReducer,
    holdings: holdingSlice,
    marketData: marketDataSlice,
    stocksData: stocksDataSlice,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

setupListeners(store.dispatch)