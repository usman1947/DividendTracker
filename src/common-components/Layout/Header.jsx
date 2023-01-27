import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import SearchStocks from 'stocks/components/SearchStocks'

const Header = () => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar variant="app-bar">
                <Typography variant="h6">
                    Dividend Tracker
                </Typography>
                <SearchStocks/>
                <Box/>
            </Toolbar>
        </AppBar>
    )
}

export default Header;