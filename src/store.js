import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import testReducer from 'services/testSlice.js'

export const store = configureStore({
  reducer: {
    test: testReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

setupListeners(store.dispatch)