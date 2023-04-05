import React from 'react'
import {
    useTheme,
    Stack,
    Paper,
    Typography,
    useMediaQuery,
} from '@mui/material'
import { useSelector } from 'react-redux'
import {
    formatCurrencyNumber,
    formatPercentage,
    isNullOrEmpty,
} from 'util/utility'
import LeaderBoardIcon from '@mui/icons-material/Leaderboard'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import InsightsIcon from '@mui/icons-material/Insights'
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined'
import { selectHoldingData } from 'services/holding-slice'
import { PieChart, ChartWithListCard } from './components'
import { NoDataOverlay } from 'components/overlay'

const dashboardWidth = { xs: '100%', md: '942px' }

const Dashboard = () => {
    const holdingsData = useSelector(selectHoldingData)
    const { data } = holdingsData || {}

    return isNullOrEmpty(data) ? (
        <NoDataOverlay />
    ) : (
        <Stack
            width="100%"
            justifyContent="center"
            alignItems="center"
            spacing={5}
        >
            <DashboardCards />
            {data && (
                <ChartWithListCard
                    title="Top Holdings By Value"
                    width={dashboardWidth}
                    data={data}
                    dataValueKey="value"
                />
            )}
            {data && (
                <ChartWithListCard
                    title="Top Dividend Payers"
                    width={dashboardWidth}
                    data={data}
                    dataValueKey="annualIncomeAfterTax"
                />
            )}
        </Stack>
    )
}

const DashboardCards = () => {
    const holdingsData = useSelector(selectHoldingData)
    const {
        data,
        totalValueUnformatted,
        totalAnnualIncome,
        totalCostUnformatted,
        totalReturnUnformatted,
        returnPercentage,
        totalDividendGrowth,
        stocksWithDividendThisMonth = [],
    } = holdingsData || {}
    const totalValue = totalValueUnformatted
    const returns = totalReturnUnformatted
    const annualIncome = totalAnnualIncome
    const annualYield = totalAnnualIncome / totalCostUnformatted
    const averageDividendGrowth = totalDividendGrowth
    const sectors = data?.reduce((acc, { sector }) => {
        acc[sector] = (acc[sector] || 0) + 1
        return acc
    }, {})

    return (
        <Stack
            width={dashboardWidth}
            height="100%"
            justifyContent="center"
            alignItems="center"
        >
            <Paper elevation={8} variant="rounded">
                <Stack direction={{ xs: 'column', md: 'row' }}>
                    <InfoCard
                        title="Income"
                        description="Your annual income after tax"
                        value={formatCurrencyNumber(annualIncome)}
                        icon={
                            <LeaderBoardIcon
                                fontSize="large"
                                sx={{ color: 'info.main' }}
                            />
                        }
                    />
                    <InfoCard
                        title="Balance & Performance"
                        description="Your portfolio returns"
                        content={
                            <Stack direction="row" spacing={1}>
                                <Typography variant="h6" type="bold">
                                    {formatCurrencyNumber(returns)}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    type="bold"
                                    color={
                                        returns > 0
                                            ? 'colors.green'
                                            : 'colors.red'
                                    }
                                >
                                    ({returnPercentage})
                                </Typography>
                            </Stack>
                        }
                        icon={
                            <PriceChangeOutlinedIcon
                                fontSize="large"
                                sx={{ color: 'info.main' }}
                            />
                        }
                    />
                    <InfoCard
                        title="Valuation"
                        description="Your annual dividend yield on cost"
                        value={formatPercentage(annualYield)}
                        icon={
                            <Typography
                                variant="body2"
                                color="secondary.main"
                                sx={{ textAlign: 'center' }}
                            >
                                <ThisMonthDividendText
                                    stocks={stocksWithDividendThisMonth}
                                />
                            </Typography>
                        }
                    />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }}>
                    <InfoCard
                        title="Total Value"
                        description="Your portfolio`s total value today"
                        value={formatCurrencyNumber(totalValue)}
                        icon={
                            <ShowChartIcon
                                fontSize="large"
                                sx={{ color: 'info.main' }}
                            />
                        }
                    />
                    <InfoCard
                        title="Dividend Growth"
                        description="Annual dividend growth rate"
                        value={formatPercentage(averageDividendGrowth)}
                        icon={
                            <InsightsIcon
                                fontSize="large"
                                sx={{ color: 'info.main' }}
                            />
                        }
                    />
                    <InfoCard
                        title="Diversification"
                        description={`Sector diversification of your ${data?.length} stocks`}
                        content={
                            <Stack width="150px" height="140px">
                                {sectors && (
                                    <PieChart
                                        values={Object.values(sectors)}
                                        labels={Object.keys(sectors)}
                                        legendConfig={{
                                            display: false,
                                        }}
                                    />
                                )}
                            </Stack>
                        }
                    />
                </Stack>
            </Paper>
        </Stack>
    )
}

const InfoCard = ({ title, description, value, content, icon }) => {
    const theme = useTheme()
    const isXsDevices = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Stack
            width={{
                xs: '100%',
                md: '280px',
                boxSizing: isXsDevices && 'border-box',
            }}
            height="200px"
            justifyContent="center"
            alignItems="center"
            px="16px"
            sx={{
                border: `1px solid ${theme.palette.secondary.shades['12p']}`,
            }}
        >
            <Typography variant="h5" color="info.main">
                {title}
            </Typography>
            <Typography variant="body2">{description}</Typography>
            {content ? (
                content
            ) : (
                <Typography variant="h6" type="bold">
                    {value}
                </Typography>
            )}
            {icon}
        </Stack>
    )
}

const ThisMonthDividendText = ({ stocks }) => {
    if (stocks.length === 0) {
        return (
            <Typography variant="body2">
                None of your stocks will pay dividend this month :(
            </Typography>
        )
    } else if (stocks.length <= 2) {
        return (
            <Typography variant="body2">
                {`${stocks.join(', ')} will pay their dividends
                this month`}
            </Typography>
        )
    } else {
        return (
            <Typography variant="body2">
                {`${stocks.slice(0, 2).join(', ')} and ${
                    stocks.slice(2).length
                } others will pay their dividends this month`}
            </Typography>
        )
    }
}

export default Dashboard
