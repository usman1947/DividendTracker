import React from 'react'
import { Drawer, Stack, Typography } from '@mui/material'
import SideMenuListItems from './side-menu-list'
import LogoutIcon from '@mui/icons-material/Logout'
import { WebUrl } from 'util/constants'
import { useNavigate } from 'react-router-dom'
import { setIsLoggedIn } from 'services/app-slice'
import { useDispatch } from 'react-redux'

const drawerWidth = 220

const SideBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
            <Stack
                height="100%"
                alignItems="flex-end"
                direction="row"
                padding={2}
                spacing={3}
                marginBottom={5}
            >
                <LogoutIcon />
                <Typography
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        localStorage.clear()
                        dispatch(setIsLoggedIn(false))
                        navigate(WebUrl._LOGIN)
                    }}
                >
                    Logout
                </Typography>
            </Stack>
        </Drawer>
    )
}

export default SideBar
