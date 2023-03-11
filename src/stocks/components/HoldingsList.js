import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Typography } from '@mui/material';
import NoRecordsImage from 'assets/no-records.png'
import { useGetAllHoldingsQuery } from 'services/api'
import { unFormatNumber } from 'util/Utility'
import Price52WeeksRange from 'stocks/components/Price52WeeksRange.jsx'

const columns = [
  { 
    field: 'ticker', 
    headerName: 'Ticker', 
    width: 65 ,
    renderCell: (params) => {
      return (
        <Typography variant='sub1' color='info.main'>
          {params.value}
        </Typography>
      )
    }
  },
  { 
    field: 'sector', 
    headerName: 'Sector', 
    width: 100 
  },
  {
    field: 'shares',
    headerName: 'Shares',
    width: 50,
  },
  {
    field: 'buyPrice',
    headerName: 'Buy Price',
    width: 50,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    width: 70,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 80,
  },
  {
    field: 'range',
    headerName: '52 Weeks Range',
    width: 120,
    renderCell: (params) => {
      const fiftyTwoWeekHigh = params.row.fiftyTwoWeekHigh
      const fiftyTwoWeekLow = params.row.fiftyTwoWeekLow 
      const price = params.row.priceUnformatted
      return <Price52WeeksRange low={fiftyTwoWeekLow} high={fiftyTwoWeekHigh} price={price}/>
    }
  },
  {
    field: 'value',
    headerName: 'Value',
    width: 80,
  },
  {
    field: 'returnPercentage',
    headerName: 'Return %',
    width: 70,
    renderCell: (params) => {
      const value = unFormatNumber(params.value)
      return(
      <Typography variant='subtitle2'
      sx={{color : value < 0 ? 'colors.red' : 'colors.green'}}>
        {params.value}
      </Typography>
      )
    }
  },
  {
    field: 'return',
    headerName: 'Return',
    width: 60,
    renderCell: (params) => {
      const value = unFormatNumber(params.value)
      return(
      <Typography variant='subtitle2'
      sx={{color : value < 0 ? 'colors.red' : 'colors.green'}}>
        {params.value}
      </Typography>
      )
    }
  },
  {
    field: 'weight',
    headerName: 'Weight',
    width: 70,
  },
  {
    field: 'yoc',
    headerName: 'YOC',
    width: 70,
  },
  {
    field: 'yield',
    headerName: 'Yield',
    width: 70,
  },
  {
    field: 'fiveYearDividendGrowth',
    headerName: '5 Year Growth Rate %',
    width: 70,
  },
  {
    field: 'annualIncome',
    headerName: 'AI',
    width: 60,
  },
  {
    field: 'annualIncomeAfterTax',
    headerName: 'AIT',
    width: 60,
  },
];

const HoldingsList = (props) => {

    const holdingsApi = useGetAllHoldingsQuery()
    const { rows } = props

    return (
      <DataGrid
      rows={rows ?? []}
      columns={columns}
      autoPageSize
      components={{
        NoRowsOverlay: CustomNoRowsOverlay,
      }}
      disableSelectionOnClick
      disableVirtualization
      getRowId={(row) => row._id}
      headerHeight={40}
      loading={holdingsApi.isFetching}
      />
    );
}

const CustomNoRowsOverlay = () => {
  return (
    <Stack with='100%' height='100%' alignItems='center' justifyContent='center'>
      <img src={NoRecordsImage} alt=""/>
      <Typography variant='subtitle1'>
        No holdings added, Please click +ADD to add holdings
      </Typography>
    </Stack>
  );
}

export default HoldingsList
