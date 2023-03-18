import * as React from 'react'
import { Box, Slider, Typography } from '@mui/material'
import { isNullOrEmpty, formatCurrencyNumber } from 'util/Utility'

export const Price52WeeksRange = (props) => {
    const { low, high, price } = props

    return (
        <Box sx={{ width: '100%', pr: '4px' }}>
            {isNullOrEmpty(low) || isNullOrEmpty(high) ? (
                <Box />
            ) : (
                <Slider
                    disabled
                    variant="52-week-range"
                    size="small"
                    defaultValue={price}
                    min={low}
                    max={high}
                    marks={[
                        {
                            value: low,
                            label: (
                                <Typography sx={{ fontSize: '12px' }} ml="10px">
                                    {formatCurrencyNumber(Math.round(low))}
                                </Typography>
                            ),
                        },
                        {
                            value: high,
                            label: (
                                <Typography sx={{ fontSize: '12px' }} mr="10px">
                                    {formatCurrencyNumber(Math.round(high))}
                                </Typography>
                            ),
                        },
                    ]}
                />
            )}
        </Box>
    )
}

export default Price52WeeksRange
