import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { selectMarketData } from 'services/marketDataSlice';
import { getReturnPercentage, formatNumber } from 'util/Utility'

const columns = [
  { 
    field: 'ticker', 
    headerName: 'Ticker', 
    width: 90 
  },
  {
    field: 'shares',
    headerName: 'Shares',
    width: 50,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    width: 80,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 80,
  },
  {
    field: 'totalCost',
    headerName: 'Total Cost',
    width: 100,
  },
  {
    field: 'value',
    headerName: 'Value',
    width: 100,
  },
  {
    field: 'returnPercentage',
    headerName: 'Return %',
    width: 70,
  },
  {
    field: 'return',
    headerName: 'Return',
    width: 80,
  },
  {
    field: 'yoc',
    headerName: 'YOC',
    width: 50,
  },
  {
    field: 'yield',
    headerName: 'Yield',
    width: 50,
  },
  {
    field: 'growthRate',
    headerName: '5 Year Growth Rate %',
    width: 50,
  },
  {
    field: 'annualIncome',
    headerName: 'Annual Income',
    width: 80,
  },
  {
    field: 'annualIncomeAfterTax',
    headerName: 'Annual Income After Tax',
    width: 80,
  },
];

const HoldingsList = (props) => {

    const { holdings } = props;
    const marketData = useSelector(selectMarketData)
    const holdingsData = marketData.filter(d => holdings.findIndex(h => d.T === h.ticker) !== -1)
    const rowsData = holdings.map(holding => {
      const priceData = holdingsData.find(d => d.T === holding.ticker)
      const price = priceData?.c
      const cost = holding.shares * holding.cost
      const value = holding.shares * price
      return {
        ...holding,
        price: formatNumber(price),
        totalCost: formatNumber(cost),
        value: formatNumber(value),
        returnPercentage: getReturnPercentage(value, cost),
        return: formatNumber(value - cost)
      }
    })

    return (
      <DataGrid
      rows={rowsData}
      columns={columns}
      autoPageSize
      disableSelectionOnClick
      disableVirtualization
      getRowId={(row) => row.id}
      />
    );
}

export default HoldingsList
