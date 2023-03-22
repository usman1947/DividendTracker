import React from 'react'
import {
    Toolbar,
    List,
    ListItemButton,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import DashboardIcon from '@mui/icons-material/Dashboard'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import { WebUrl } from 'util/constants.js'
import { useNavigate, useLocation } from 'react-router-dom'

const SideBarListItems = [
    {
        label: 'Dashboard',
        url: WebUrl._DASHBOARD,
        icon: DashboardIcon,
    },
    {
        label: 'Portfolio',
        url: WebUrl._PORTFOLIO,
        icon: ShowChartIcon,
    },
    {
        label: 'WatchList',
        url: 'watchList',
        icon: WatchLaterIcon,
        disabled: true,
    },
]
const SideMenuListItems = ({ setOpen = () => {} }) => {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <>
            <Toolbar />
            <List>
                {SideBarListItems.map((item) => {
                    const isSelected =
                        location.pathname?.substring(1) === item.url
                    return (
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    setOpen(false)
                                    navigate(item.url)
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
                    )
                })}
            </List>
        </>
    )
}

export default SideMenuListItems
