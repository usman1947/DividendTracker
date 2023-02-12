import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { selectMarketData } from 'services/marketDataSlice';
import { selectStocksData } from 'services/stocksDataSlice';
import { getReturnPercentage, formatCurrencyNumber, formatPercentage } from 'util/Utility'

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
    width: 70,
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
    width: 70,
  },
  {
    field: 'yield',
    headerName: 'Yield',
    width: 70,
  },
  {
    field: 'growthRate',
    headerName: '5 Year Growth Rate %',
    width: 50,
  },
  {
    field: 'annualIncome',
    headerName: 'AI',
    width: 70,
  },
  {
    field: 'annualIncomeAfterTax',
    headerName: 'AIT',
    width: 70,
  },
];

const HoldingsList = (props) => {

    const { holdings } = props;
    const taxRate = 30 
    const marketData = useSelector(selectMarketData)
    const stocksData = useSelector(selectStocksData)
    const holdingsData = marketData.filter(d => holdings.findIndex(h => d.T === h.ticker) !== -1)
    
    const rowsData = holdings.map(holding => {
      const priceData = holdingsData.find(d => d.T === holding.ticker)
      const stockDetailData = stocksData.find(d => d.symbol === holding.ticker)
      const price = priceData?.c ?? stockDetailData?.regularMarketPrice
      const shares = holding.shares
      const cost = shares* holding.cost
      const value = shares * price
      const annualYield = stockDetailData?.trailingAnnualDividendYield
      const dividendAmount = stockDetailData?.trailingAnnualDividendRate
      const annualIncome = dividendAmount * shares
      const annualIncomeAfterTax = annualIncome * (100 - taxRate)/100
      const yieldOnCost = annualIncome / cost
      return {
        ...holding,
        cost: formatCurrencyNumber(cost),
        price: formatCurrencyNumber(price),
        totalCost: formatCurrencyNumber(cost),
        value: formatCurrencyNumber(value),
        returnPercentage: getReturnPercentage(value, cost),
        return: formatCurrencyNumber(value - cost),
        yield: formatPercentage(annualYield),
        annualIncome: formatCurrencyNumber(annualIncome),
        yoc: formatPercentage(yieldOnCost),
        annualIncomeAfterTax: formatCurrencyNumber(annualIncomeAfterTax),
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
