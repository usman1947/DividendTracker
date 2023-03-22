import React from 'react'
import { WebUrl } from 'util/constants.js'
import { Portfolio } from 'features/portfolio'
import { Dashboard } from 'features/dashboard'

export const _ROUTES = [
    {
        path: '/',
        title: 'Dashboard',
        exact: true,
        Component: () => <Dashboard />,
        authRequired: false,
    },
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
