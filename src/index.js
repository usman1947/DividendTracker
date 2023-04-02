import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from 'store'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { stylesTheme, colorsTheme } from 'styling'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { deepmerge } from '@mui/utils'
import { PUBLIC_ROUTES, PRIVATE_ROUTES } from 'config/page-route.jsx'

const theme = createTheme(deepmerge(stylesTheme, colorsTheme))

const container = document.getElementById('root')
const root = createRoot(container)
const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        ),
        children: [...PUBLIC_ROUTES, ...PRIVATE_ROUTES],
    },
])
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)

reportWebVitals()
