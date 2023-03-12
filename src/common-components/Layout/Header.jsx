import React from "react";
import { AppBar, Toolbar, Typography, Stack, useMediaQuery, useTheme } from "@mui/material";
import SearchStocks from 'stocks/components/SearchStocks.js'

const Header = () => {
    const theme = useTheme()
    const isXsDevices = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar variant="app-bar">
                <Stack direction='row' alignItems="center" spacing={2}>
                    <img alt='logo' src={require('assets/logo.png')} style={{width: '50px'}}/>
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
            </Toolbar>
        </AppBar>
    )
}

export default Header;