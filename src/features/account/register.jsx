import { useState } from 'react'
import { Stack, Paper, Typography, Button } from '@mui/material'
import { GetInputComponent } from 'components/input'
import { InputTypesEnum } from 'util/constants'
import { logo } from 'assets'

const RegisterInputConfig = [
    {
        id: 'name',
        required: true,
        label: 'Name',
        type: InputTypesEnum._TEXT,
        sx: {
            width: { xs: '100%', md: '300px' },
        },
    },
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

const Register = () => {
    const [inputData, setInputData] = useState({})
    async function onSubmit(e) {
        e.preventDefault()
        console.log(inputData)
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
                        <Typography variant="h5">Sign Up</Typography>
                        {RegisterInputConfig.map((input) => {
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
                        >
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Stack>
    )
}

export default Register
