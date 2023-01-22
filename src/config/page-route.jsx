import React from 'react';
import {Redirect} from 'react-router';
import { WebUrl } from 'util/Constants.js';
import { Portfolio } from 'Stocks';

export const _ROUTES = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to={WebUrl._PORTFOLIO} />,
        authRequired: false,
    },
    {
        path: WebUrl._PORTFOLIO,
        title: 'Portfolio',
        component: () => <Portfolio />,
        authRequired: true,
        exact: true,
    }
];