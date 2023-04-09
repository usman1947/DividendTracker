import { Drawer } from '@mui/material'
import SideMenuListItems from './side-menu-list'
import Logout from './components/logout'

const drawerWidth = 240

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
            <Logout />
        </Drawer>
    )
}

export default SideBar
