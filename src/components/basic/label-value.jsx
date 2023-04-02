import React from 'react'
import { Stack, Typography } from '@mui/material/'

const LabelValue = (props) => {
    const { label, value, sx } = props
    return (
        <Stack sx={{ textAlign: 'right', ...sx }}>
            <Typography variant="subtitle3">{label}</Typography>
            <Typography variant="h6">{value}</Typography>
        </Stack>
    )
}

export default LabelValue
