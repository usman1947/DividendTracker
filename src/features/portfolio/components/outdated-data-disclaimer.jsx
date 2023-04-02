import React from 'react'
import {
    IconButton,
    Stack,
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material'
import { useLazyGetStocksDataQuery, useGetAllHoldingsQuery } from 'services/api'
import AutoRenewIcon from '@mui/icons-material/Autorenew'

const OutdatedDataDisclaimer = ({ sx }) => {
    const theme = useTheme()
    const isXsDevices = useMediaQuery(theme.breakpoints.down('sm'))
    const holdingApi = useGetAllHoldingsQuery()
    const [triggerGetStocksData, { isFetching: isFetchingStocksData }] =
        useLazyGetStocksDataQuery()

    async function updateMarketData() {
        const tickers = holdingApi.data.map((r) => r.ticker).join(',')
        triggerGetStocksData(tickers)
    }

    return (
        <Stack
            direction="row"
            width="100%"
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
            sx={sx}
        >
            <Typography variant="subtitle2">
                {isXsDevices
                    ? 'Press here to refresh market data'
                    : '*Disclaimer* Market data is not updated periodically, To get latest market data please click refresh'}
            </Typography>
            <IconButton
                disableRipple
                size="small"
                onClick={updateMarketData}
                disabled={isFetchingStocksData}
            >
                <AutoRenewIcon fontSize="small" />
            </IconButton>
        </Stack>
    )
}

export default OutdatedDataDisclaimer
