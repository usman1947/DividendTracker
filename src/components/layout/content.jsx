import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { PUBLIC_ROUTES, PRIVATE_ROUTES } from 'config/page-route.jsx'
import { PageSettings } from 'config/page-settings.js'
import { Box, Paper, Snackbar } from '@mui/material'
import { useSelector } from 'react-redux'
import { errorMsg, setError } from 'services/app-slice'
import PrivateRouteWrapper from './services/private-route-wrapper'
import { useDispatch } from 'react-redux'

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

const Content = () => {
    const error = useSelector(errorMsg)
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        var routes = [...PUBLIC_ROUTES, ...PRIVATE_ROUTES]
        setTitle(location.pathname, routes)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <PageSettings.Consumer>
            {() => (
                <Paper variant="content">
                    <Routes>
                        {PUBLIC_ROUTES.map((route, index) => (
                            <Route key={index} {...route} />
                        ))}
                        {PRIVATE_ROUTES.map((route, index) => (
                            <Route element={<PrivateRouteWrapper {...route} />}>
                                <Route
                                    key={index}
                                    {...route}
                                    element={(renderProps) => {
                                        ;<route.Component {...renderProps} />
                                    }}
                                />
                            </Route>
                        ))}
                        <Route path="" render={() => <Box>404</Box>} />
                    </Routes>
                    <Snackbar
                        open={error}
                        autoHideDuration={3000}
                        onClose={() => dispatch(setError(null))}
                        message={error}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    />
                </Paper>
            )}
        </PageSettings.Consumer>
    )
}

export default Content
