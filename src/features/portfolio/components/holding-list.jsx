import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Typography } from '@mui/material'
import { useGetAllHoldingsQuery } from 'services/api'
import {
    unFormatNumber,
    formatCurrencyNumber,
    formatPercentage,
} from 'util/utility'
import Price52WeeksRange from './price-52-weeks-range'
import AddLogo from './add-logo'
import { NoDataOverlay } from 'components/overlay'

const columns = [
    {
        field: 'logo',
        headerName: 'Logo',
        width: 80,
        renderCell: (params) => {
            return (
                <AddLogo logo={params.value} id={params.row._id} width={50} />
            )
        },
        sortable: false,
        filterable: false,
    },
    {
        field: 'ticker',
        headerName: 'Ticker',
        width: 65,
        renderCell: (params) => {
            return (
                <Typography variant="sub1" color="info.main">
                    {params.value}
                </Typography>
            )
        },
    },
    {
        field: 'sector',
        headerName: 'Sector',
        width: 100,
    },
    {
        field: 'shares',
        headerName: 'Shares',
        width: 50,
    },
    {
        field: 'buyPrice',
        headerName: 'Buy Price',
        width: 70,
        sortable: false,
        filterable: false,
    },
    {
        field: 'cost',
        headerName: 'Cost',
        width: 70,
        renderCell: (params) => formatCurrencyNumber(params.value),
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 80,
        renderCell: (params) => formatCurrencyNumber(params.value),
    },
    {
        field: 'range',
        headerName: '52 Weeks Range',
        width: 120,
        renderCell: (params) => {
            const fiftyTwoWeekHigh = params.row.fiftyTwoWeekHigh
            const fiftyTwoWeekLow = params.row.fiftyTwoWeekLow
            const price = params.row.priceUnformatted
            return (
                <Price52WeeksRange
                    low={fiftyTwoWeekLow}
                    high={fiftyTwoWeekHigh}
                    price={price}
                />
            )
        },
        sortable: false,
        filterable: false,
    },
    {
        field: 'value',
        headerName: 'Value',
        width: 80,
        renderCell: (params) => formatCurrencyNumber(params.value),
    },
    {
        field: 'returnPercentage',
        headerName: 'Return %',
        width: 70,
        renderCell: (params) => {
            const value = params.value
            return (
                <Typography
                    variant="subtitle2"
                    sx={{ color: value < 0 ? 'colors.red' : 'colors.green' }}
                >
                    {formatPercentage(params.value / 100)}
                </Typography>
            )
        },
    },
    {
        field: 'return',
        headerName: 'Return',
        width: 60,
        renderCell: (params) => {
            const value = params.value
            return (
                <Typography
                    variant="subtitle2"
                    sx={{ color: value < 0 ? 'colors.red' : 'colors.green' }}
                >
                    {formatCurrencyNumber(value)}
                </Typography>
            )
        },
    },
    {
        field: 'weight',
        headerName: 'Weight',
        width: 70,
        renderCell: (params) => formatPercentage(params.value),
    },
    {
        field: 'yoc',
        headerName: 'YOC',
        width: 70,
        renderCell: (params) => formatPercentage(params.value),
    },
    {
        field: 'yield',
        headerName: 'Yield',
        width: 70,
        renderCell: (params) => formatPercentage(params.value),
    },
    {
        field: 'fiveYearDividendGrowth',
        headerName: '5 Year Growth Rate %',
        width: 80,
        renderCell: (params) => formatPercentage(params.value),
    },
    {
        field: 'annualIncome',
        headerName: 'Annual Income',
        width: 95,
        renderCell: (params) => formatCurrencyNumber(params.value),
    },
    {
        field: 'annualIncomeAfterTax',
        headerName: 'Annual Income After Tax',
        width: 120,
        renderCell: (params) => formatCurrencyNumber(params.value),
    },
]

const HoldingsList = (props) => {
    const holdingsApi = useGetAllHoldingsQuery()
    const { rows } = props

    return (
        <DataGrid
            rows={rows ?? []}
            columns={columns}
            autoPageSize
            components={{
                NoRowsOverlay: NoDataOverlay,
            }}
            disableSelectionOnClick
            disableVirtualization
            getRowId={(row) => row._id}
            headerHeight={40}
            loading={holdingsApi.isFetching}
        />
    )
}

export default HoldingsList
