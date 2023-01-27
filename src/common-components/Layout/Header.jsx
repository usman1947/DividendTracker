import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar variant="app-bar">
                <Typography variant="h6">
                    Dividend Tracker
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;