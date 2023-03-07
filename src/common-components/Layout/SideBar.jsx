import React from "react";
import { Box, Drawer, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { useHistory, useLocation } from 'react-router-dom';
import { WebUrl } from 'util/Constants.js';

const drawerWidth = 220;

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

const SideBar = () => {

    const _history = useHistory();
    const location = useLocation();

    return (
        <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        >
            <Toolbar/>
            <Box sx={{ overflow: 'auto' }}>
            <List>
                {SideBarListItems.map((item) => {
                    const isSelected = location.pathname?.substring(1) === item.url
                    return(
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton 
                            onClick={() => _history.push(item.url)} 
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
            </Box>
      </Drawer>
    )
}

export default SideBar;