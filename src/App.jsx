import 'styling/scss/site.scss'
import { Header, Content, SideBar } from 'components/layout'
import { Box, useMediaQuery, useTheme, Toolbar } from '@mui/material'
import { setIsLoggedIn, isLoggedIn } from 'services/app-slice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function App() {
    const theme = useTheme()
    const dispatch = useDispatch()
    const isXsDevices = useMediaQuery(theme.breakpoints.down('sm'))
    const isUserLoggedIn = useSelector(isLoggedIn)
    useEffect(() => {
        dispatch(setIsLoggedIn(localStorage.getItem('isLoggedIn')))
    }, [dispatch])

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            {isUserLoggedIn && <Header />}
            <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
                {!isXsDevices && isUserLoggedIn && <SideBar />}
                <Box display="flex" flexDirection="column" flex={1}>
                    {isUserLoggedIn && <Toolbar />}
                    <Content />
                </Box>
            </Box>
        </Box>
    )
}

export default App
