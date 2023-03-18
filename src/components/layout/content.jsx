import React, { useEffect } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { _ROUTES } from 'config/page-route.jsx'
import { PageSettings } from 'config/page-settings.js'
import { Box, CircularProgress, Paper, Stack } from '@mui/material'
import { useLazyGetStocksDataQuery, useGetAllHoldingsQuery } from 'services/api'
import { isNullOrEmpty } from 'util/utility'
import { GenerateHoldingsData } from './services/helper-functions'
import { addHoldingsData } from 'services/holding-slice'
import { useDispatch, useSelector } from 'react-redux'
import { isLoading, setIsLoading } from 'services/app-slice'

const compareRoutes = (routePath, path) => {
    const splitRoutePath = routePath.split('/').slice(1)
    const splitPath = path.split('/').slice(1)

    splitRoutePath.forEach((item, index) => {
        if (item.charAt(0) === ':') {
            splitRoutePath.splice(index, 1)

            if (splitPath[index] !== undefined) {
                splitPath.splice(index, 1)
            }
        }
    })

    return splitRoutePath.join('/') === splitPath.join('/')
}

const setTitle = (path, routeArray) => {
    var pageTitle = 'Dividend Tracker'
    for (var i = 0; i < routeArray.length; i++) {
        if (compareRoutes(routeArray[i].path, path)) {
            pageTitle = `${routeArray[i].title} | ` + pageTitle
        }
    }
    document.title = pageTitle
}

const PrivateRoute = (props) => {
    let { component: Component, ...rest } = props
    return (
        <Route
            {...rest}
            render={(renderProps) => <Component {...renderProps} />}
        />
    )
}

const Content = ({ history }) => {
    const [triggerGetStocksData, stocksApi] = useLazyGetStocksDataQuery()
    const holdingsApi = useGetAllHoldingsQuery()
    const dispatch = useDispatch()
    const isAppLoading = useSelector(isLoading)

    useEffect(() => {
        var routes = _ROUTES
        setTitle(history.location.pathname, routes)
        return history.listen(() => {
            setTitle(history.location.pathname, routes)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history.location.pathname])

    useEffect(() => {
        if (
            !isNullOrEmpty(holdingsApi.data) &&
            holdingsApi.status !== 'pending'
        ) {
            const tickers = holdingsApi.data.map((r) => r.ticker).join(',')
            triggerGetStocksData(tickers)
        } else if (holdingsApi.status === 'fulfilled') {
            dispatch(setIsLoading(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [holdingsApi.status])

    useEffect(() => {
        if (
            !isNullOrEmpty(stocksApi.data) &&
            holdingsApi.data?.length === stocksApi.data?.length
        ) {
            dispatch(setIsLoading(false))
            const data = GenerateHoldingsData(holdingsApi.data, stocksApi.data)
            dispatch(addHoldingsData(data))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stocksApi.status, stocksApi.data, holdingsApi.data])

    return isAppLoading ? (
        <Stack
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
        >
            <CircularProgress />
        </Stack>
    ) : (
        <PageSettings.Consumer>
            {() => (
                <Paper variant="content">
                    <Switch>
                        {_ROUTES.map((route, index) => (
                            <PrivateRoute key={index} {...route} />
                        ))}
                        <Route path="" render={() => <Box>404</Box>} />
                    </Switch>
                </Paper>
            )}
        </PageSettings.Consumer>
    )
}

export default withRouter(Content)
