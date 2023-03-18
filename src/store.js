import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import testReducer from 'services/testSlice.js'
import holdingSlice from 'services/holdingSlice'
import appSlice from 'services/appSlice'
import { api } from 'services/api'

export const store = configureStore({
    reducer: {
        test: testReducer,
        holdings: holdingSlice,
        app: appSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)
