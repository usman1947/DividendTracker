import React from 'react'
import {
    Stack,
    Paper,
    Typography,
    List,
    useTheme,
    useMediaQuery,
} from '@mui/material'
import { formatCurrencyNumber } from 'util/Utility'
import PieChart from 'stocks/components/PieChart.jsx'
import { orderBy } from 'lodash'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'

const ChartWithListCard = (props) => {
    const theme = useTheme()
    const isXsDevices = useMediaQuery(theme.breakpoints.down('sm'))
    const { title, width, data, dataValueKey } = props
    const sortedDataByDataKeyValue = orderBy(data, dataValueKey, 'desc')
    const dataKeyValues = sortedDataByDataKeyValue?.map(
        (stock) => stock[dataValueKey]
    )
    const sortedStockTickers = sortedDataByDataKeyValue?.map(
        (stock) => stock.ticker
    )

    return (
        <Paper
            elevation={8}
            sx={{
                width: width,
                height: { xs: 'fit-content' },
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
            }}
            justifyContent="space-between"
        >
            <Stack
                width={{ xs: '100%', md: '50%' }}
                height="100%"
                spacing={3}
                sx={{ p: '32px 32px 0 32px', boxSizing: 'border-box' }}
            >
                <Typography variant="h4" color="info.main">
                    {title}
                </Typography>
                <List>
                    {data.map(
                        (stock, i) =>
                            i < 8 && (
                                <Stack
                                    key={i}
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <DoubleArrowIcon
                                            fontSize="small"
                                            sx={{ color: 'info.main' }}
                                        />
                                        <Typography variant="h6">
                                            {stock.displayName} ({stock.ticker})
                                        </Typography>
                                    </Stack>
                                    <Typography variant="h6" type="bold">
                                        {formatCurrencyNumber(
                                            stock[dataValueKey]
                                        )}
                                    </Typography>
                                </Stack>
                            )
                    )}
                </List>
            </Stack>
            <Stack
                width={{ xs: '100%', md: '50%' }}
                p={{ xs: '32px', md: 0 }}
                height="100%"
                pr={{ md: '32px' }}
                sx={{ zIndex: 6, boxSizing: 'border-box' }}
                alignItems="flex-end"
            >
                <PieChart
                    values={dataKeyValues}
                    labels={sortedStockTickers}
                    legendConfig={{ position: isXsDevices ? 'top' : 'right' }}
                />
            </Stack>
        </Paper>
    )
}

export default ChartWithListCard
