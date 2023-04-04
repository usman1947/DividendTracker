import { useState } from 'react'
import { Stack, Paper, Typography, Button } from '@mui/material'
import { GetInputComponent } from 'components/input'
import { InputTypesEnum } from 'util/constants'
import { logo } from 'assets'
import { Link, useNavigate } from 'react-router-dom'
import { WebUrl } from 'util/constants.js'
import { setError, setIsLoggedIn } from 'services/app-slice'
import { useDispatch } from 'react-redux'

const LoginInputConfig = [
    {
        id: 'email',
        required: true,
        label: 'Email',
        type: InputTypesEnum._TEXT,
        sx: {
            width: { xs: '100%', md: '300px' },
        },
    },
    {
        id: 'password',
        required: true,
        label: 'Password',
        type: InputTypesEnum._PASSWORD,
        sx: {
            width: { xs: '100%', md: '300px' },
        },
    },
]

const Login = () => {
    const [inputData, setInputData] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    async function onSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(inputData),
        }).finally(() => setLoading(false))
        var result = await response.json()
        if (!result.success) {
            dispatch(setError(result.message))
        } else if (result.success) {
            dispatch(setIsLoggedIn(true))
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('jwtToken', result.token)
            navigate(WebUrl._DASHBOARD)
        }
    }

    return (
        <Stack
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
        >
            <Paper elevation={8} variant="rounded" sx={{ padding: 4 }}>
                <form id="register-form" onSubmit={onSubmit}>
                    <Stack spacing={2} alignItems="center">
                        <Stack
                            spacing={2}
                            direction="row"
                            alignItems="center"
                            mb={2}
                        >
                            <img
                                alt="logo"
                                src={logo}
                                style={{ width: '50px' }}
                            />
                            <Typography variant="h4">
                                Dividend Tracker
                            </Typography>
                        </Stack>
                        <Typography variant="h5">Sign In</Typography>
                        {LoginInputConfig.map((input) => {
                            return (
                                <GetInputComponent
                                    key={`input-${input.id}`}
                                    getInput={inputData}
                                    setInput={setInputData}
                                    input={input}
                                />
                            )
                        })}
                        <Button
                            form="register-form"
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            Login
                        </Button>
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Link to={WebUrl._REGISTER}>Register</Link>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Stack>
    )
}

export default Login
