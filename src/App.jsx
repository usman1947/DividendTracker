import React from 'react'
import 'styling/scss/site.scss'
import { Header, Content, SideBar } from 'components/layout'
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
