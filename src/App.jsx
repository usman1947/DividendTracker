import React from 'react'
import 'scss/site.scss'
import Header from 'common-components/Layout/Header'
import SideBar from 'common-components/Layout/SideBar'
import Content from 'common-components/Layout/Content'
import { Box, useMediaQuery, useTheme, Toolbar } from '@mui/material'

function App() {
    const theme = useTheme()
    const isXsDevices = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Header />
            <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
                {!isXsDevices && <SideBar />}
                <Box display="flex" flexDirection="column" flex={1}>
                    <Toolbar />
                    <Content />
                </Box>
            </Box>
        </Box>
    )
}

export default App
