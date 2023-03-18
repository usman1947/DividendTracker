import React from 'react'
import { Box, Stack, Divider } from '@mui/material'
import {
    AddHoldingDialog,
    EditHoldingDialog,
    OutdatedDataDisclaimer,
    HoldingsList,
} from './components'
import { isNullOrEmpty } from 'util/utility'
import { useGetAllHoldingsQuery } from 'services/api'
import { LabelValue } from 'components/basic'
import { selectHoldingData } from 'services/holding-slice'
import { useSelector } from 'react-redux'

const Portfolio = () => {
    const holdingsApi = useGetAllHoldingsQuery()
    const holdingsData = useSelector(selectHoldingData)
    const {
        data,
        totalValue,
        totalReturn,
        totalReturnUnformatted,
        returnPercentage,
    } = holdingsData || {}

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    height: '50px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Stack direction="row" spacing={1} alignItems="center" mb="4px">
                    {data && (
                        <>
                            <LabelValue
                                label="Total Return"
                                value={`${totalReturn} (${returnPercentage})`}
                                sx={{
                                    mr: '8px',
                                    color:
                                        totalReturnUnformatted > 0
                                            ? 'colors.green'
                                            : 'colors.red',
                                }}
                            />
                            <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                                sx={{ mx: '8px' }}
                            />
                            <LabelValue
                                label="Total Value"
                                value={totalValue}
                                sx={{ paddingLeft: '8px', pr: '16px' }}
                            />
                        </>
                    )}
                    <EditHoldingDialog />
                    <AddHoldingDialog />
                </Stack>
            </Box>
            <HoldingsList rows={data} />
            {!isNullOrEmpty(holdingsApi.data) && (
                <OutdatedDataDisclaimer sx={{ marginBottom: '-16px' }} />
            )}
        </Box>
    )
}

export default Portfolio
