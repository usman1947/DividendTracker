import React, { useContext, useEffect } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { _ROUTES } from 'config/page-route.jsx';
import { PageSettings } from 'config/page-settings.js';
import { useTheme, useMediaQuery, Box } from '@mui/material';

const compareRoutes = (routePath, path) => {
	const splitRoutePath = routePath.split('/').slice(1);
	const splitPath = path.split('/').slice(1);

	splitRoutePath.forEach((item, index) => {
		if (item.charAt(0) === ':') {
			splitRoutePath.splice(index, 1);

			if (splitPath[index] !== undefined) {
				splitPath.splice(index, 1);
			}
		}
	});

	return splitRoutePath.join('/') === splitPath.join('/');
}

const setTitle = (path, routeArray) => {
	var pageTitle = 'Dividend Tracker';
	for (var i = 0; i < routeArray.length; i++) {
		if (compareRoutes(routeArray[i].path, path)) {
			pageTitle = `${routeArray[i].title} | ` + pageTitle;
		}
	}
	document.title = pageTitle;
}

const PrivateRoute = (props) => {
	let { component: Component, ...rest } = props;
	return (
		<Route {...rest} render={renderProps => (
			<Component {...renderProps} />
		)} />
	);
};

const Content = ({ history }) => {
	const theme = useTheme()
	const _context = useContext(PageSettings);
	
	useEffect(() => {
		var routes = _ROUTES;
		setTitle(history.location.pathname, routes);
		return history.listen(() => {
			setTitle(history.location.pathname, routes);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [history.location.pathname]);

	const isXsDevices = useMediaQuery(theme.breakpoints.down('sm'));
    const isSmDevices = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMdDevices = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLgDevices = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    const isXlDevices = useMediaQuery(theme.breakpoints.up('xl'));

	useEffect(() => {
		_context.setOptions("isXsDevices", isXsDevices)
		_context.setOptions("isSmDevices", isSmDevices)
		_context.setOptions("isMdDevices", isMdDevices)
		_context.setOptions("isLgDevices", isLgDevices)
		_context.setOptions("isXlDevices", isXlDevices)
	// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isXsDevices,
        isSmDevices,
        isMdDevices,
        isLgDevices,
        isXlDevices,
    ]);
	
	return (
        <PageSettings.Consumer>
			{() => (
				<Box className='content'>
                    <Switch>
                        {_ROUTES.map((route, index) => (
                            <PrivateRoute key={index} {...route} />
                        ))}
                        <Route path="" render={() => <Box>404</Box>} />
                    </Switch>
				</Box>
			)}
		</PageSettings.Consumer>
	)
}

export default withRouter(Content);