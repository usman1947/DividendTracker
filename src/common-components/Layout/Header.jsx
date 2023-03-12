import React, {useState} from "react";
import { AppBar, Toolbar, Typography, Stack, useMediaQuery, useTheme, SwipeableDrawer, List, ListItemButton, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import SearchStocks from 'stocks/components/SearchStocks.js'
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { WebUrl } from 'util/Constants.js';
import { useHistory, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const SideBarListItems = [
    {
        label: 'Dashboard',
        url: WebUrl._DASHBOARD,
        icon: DashboardIcon,
    },
    {
        label: 'Portfolio',
        url: WebUrl._PORTFOLIO,
        icon: ShowChartIcon
    },
    {
        label: 'WatchList',
        url: 'watchList',
        icon: WatchLaterIcon,
        disabled: true
    }
]
const Header = () => {
    const theme = useTheme()
    const isXsDevices = useMediaQuery(theme.breakpoints.down('sm'));
    const _history = useHistory();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar variant="app-bar">
                <Stack direction='row' alignItems="center" spacing={2}>
                    <img alt='logo' src={require('assets/logo.png')} style={{width: isXsDevices ? '40px' : '50px'}}/>
                    <Typography variant="h6">
                        Dividend Tracker
                    </Typography>
                </Stack>
                {!isXsDevices &&
                <SearchStocks
                width='500px'
                onChange={() => undefined}
                />}
                <Stack/>
                {isXsDevices && 
                <IconButton 
                sx={{ mr: 3 }}
                color="inherit" onClick={() => setOpen(true)}>
                    <MenuIcon />
                </IconButton>}
                {isXsDevices &&
                <SwipeableDrawer
                open={open}
                anchor='right'
                onClose={()=> setOpen(false)}
                >
                <Toolbar/>
                <List>
                    {SideBarListItems.map((item) => {
                        const isSelected = location.pathname?.substring(1) === item.url
                        return(
                            <ListItem key={item.label} disablePadding>
                                <ListItemButton 
                                onClick={() => {
                                    setOpen(false);
                                    _history.push(item.url)
                                }} 
                                selected={isSelected}
                                disabled={item.disabled}
                                >
                                    <ListItemIcon>
                                        {item.icon && <item.icon />}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                    )})}
                </List>
                </SwipeableDrawer>}
            </Toolbar>
        </AppBar>
    )
}

export default Header;