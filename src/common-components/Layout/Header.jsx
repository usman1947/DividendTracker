import React, {useState} from "react";
import { AppBar, Toolbar, Typography, Stack, useMediaQuery, useTheme, SwipeableDrawer, IconButton } from "@mui/material";
import SearchStocks from 'stocks/components/SearchStocks.js'
import MenuIcon from '@mui/icons-material/Menu';
import SideMenuListItems from "common-components/Layout/SideMenuListItems.jsx";

const Header = () => {
    const theme = useTheme()
    const isXsDevices = useMediaQuery(theme.breakpoints.down('sm'));
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
                <SideMenuListItems setOpen={setOpen}/>
                </SwipeableDrawer>}
            </Toolbar>
        </AppBar>
    )
}

export default Header;