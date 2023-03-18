import React from 'react'
import { Drawer } from '@mui/material'
import SideMenuListItems from './side-menu-list'

const drawerWidth = 220

const SideBar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <SideMenuListItems />
        </Drawer>
    )
}

export default SideBar
