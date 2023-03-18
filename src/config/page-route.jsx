import React from 'react'
import { Redirect } from 'react-router'
import { WebUrl } from 'util/constants.js'
import { Portfolio } from 'features/portfolio'
import { Dashboard } from 'features/dashboard'

export const _ROUTES = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to={WebUrl._DASHBOARD} />,
        authRequired: false,
    },
    {
        path: WebUrl._PORTFOLIO,
        title: 'Portfolio',
        component: () => <Portfolio />,
        authRequired: true,
        exact: true,
    },
    {
        path: WebUrl._DASHBOARD,
        title: 'Dashboard',
        component: () => <Dashboard />,
        authRequired: true,
        exact: true,
    },
]
