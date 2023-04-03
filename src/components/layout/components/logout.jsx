import LogoutIcon from '@mui/icons-material/Logout'
import { WebUrl } from 'util/constants'
import { useNavigate } from 'react-router-dom'
import { setIsLoggedIn } from 'services/app-slice'
import { useDispatch } from 'react-redux'
import { Stack, Typography } from '@mui/material'

const Logout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
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
    )
}

export default Logout
