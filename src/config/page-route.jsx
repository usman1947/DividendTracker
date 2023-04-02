import React from 'react'
import { WebUrl } from 'util/constants.js'
import { Portfolio } from 'features/portfolio'
import { Dashboard } from 'features/dashboard'
import { Register } from 'features/account'

export const PUBLIC_ROUTES = [
    {
        path: '/login',
        title: 'Login',
        exact: true,
        Component: () => <Dashboard />,
        authRequired: false,
    },
    {
        path: '/register',
        title: 'Register',
        exact: true,
        Component: () => <Register />,
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
