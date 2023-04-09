import { Badge, Calendar } from 'antd'
import { selectHoldingData } from 'services/holding-slice'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { formatCurrencyNumber } from 'util/utility'
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

const DividendCalender = () => {
    const holdingsData = useSelector(selectHoldingData)

    const dividendDates = useMemo(
        () =>
            holdingsData.data?.map((stock) => {
                const dividendDate = new Date(stock.dividendDate * 1000)
                return {
                    ticker: stock.ticker,
                    month: dividendDate?.getMonth(),
                    day: dividendDate?.getDay(),
                    amount:
                        (stock.trailingAnnualDividendRate / stock.payoutCount) *
                        stock.shares,
                }
            }),
        [holdingsData.data]
    )

    const getMonthData = (value) => {
        let monthlyStocks = dividendDates?.filter((d) => {
            if (d.month === value.month()) {
                return d
            }
            return false
        })
        return monthlyStocks.map((stock) => <DividendAmount stock={stock} />)
    }

    const getListData = (value) => {
        let listData = dividendDates?.filter((d) => {
            if (d.month === value.month() && d.day === value.date()) {
                return d
            }
            return false
        })
        return listData || []
    }

    const monthCellRender = (value) => {
        const items = getMonthData(value)
        return (
            <div className="notes-month">
                <section>{items}</section>
            </div>
        )
    }

    const dateCellRender = (value) => {
        const listData = getListData(value)
        return listData.map((stock) => <DividendAmount stock={stock} />)
    }

    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current)
        if (info.type === 'month') return monthCellRender(current)
        return info.originNode
    }

    return <Calendar cellRender={cellRender} />
}

const DividendAmount = ({ stock }) => {
    const theme = useTheme()
    const isMdDevice = useMediaQuery(theme.breakpoints.up('md'))
    return (
        <Stack direction={{ md: 'row' }}>
            {isMdDevice && <Badge status={'success'} text={' '} />}
            <Stack direction={{ md: 'row' }} spacing={'4px'}>
                <Typography variant="subtitle2">{stock.ticker}</Typography>
                <Typography variant="subtitle2">
                    {formatCurrencyNumber(stock.amount)}
                </Typography>
            </Stack>
        </Stack>
    )
}

export default DividendCalender
