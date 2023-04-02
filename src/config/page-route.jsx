import React from 'react'
import { WebUrl } from 'util/constants.js'
import { Portfolio } from 'features/portfolio'
import { Dashboard } from 'features/dashboard'
import { Register, Login } from 'features/account'

export const PUBLIC_ROUTES = [
    {
        path: '/',
        title: 'Login',
        exact: true,
        Component: () => <Login />,
        authRequired: false,
    },
    {
        path: WebUrl._REGISTER,
        title: 'Register',
        exact: true,
        Component: () => <Register />,
        authRequired: false,
    },
    {
        path: WebUrl._LOGIN,
        title: 'Login',
        exact: true,
        Component: () => <Login />,
        authRequired: false,
    },
]

export const PRIVATE_ROUTES = [
    {
        path: WebUrl._PORTFOLIO,
        title: 'Portfolio',
        Component: () => <Portfolio />,
        authRequired: true,
        exact: true,
        handle: {
            crumb: () => 'Portfolio',
        },
    },
    {
        path: WebUrl._DASHBOARD,
        title: 'Dashboard',
        Component: () => <Dashboard />,
        authRequired: true,
        exact: true,
        crumb: () => 'Dashboard',
    },
]
