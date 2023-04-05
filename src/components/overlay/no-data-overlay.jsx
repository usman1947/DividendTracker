import React from 'react'
import { Stack, Typography } from '@mui/material'
import { NoRecordsImage } from 'assets'

export const NoDataOverlay = ({ imgStyle, msg }) => {
    return (
        <Stack
            with="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
        >
            <img src={NoRecordsImage} alt="" style={imgStyle} />
            <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                {msg ?? 'No holdings added, Please click +ADD to add holdings'}
            </Typography>
        </Stack>
    )
}

export default NoDataOverlay
