import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { selectMarketData } from 'services/marketDataSlice';
import { selectStocksData } from 'services/stocksDataSlice';
import { getReturnPercentage, formatCurrencyNumber, formatPercentage } from 'util/Utility'
import { Sectors } from 'util/Constants';
import { Stack, Typography } from '@mui/material';
import NoRecordsImage from 'assets/no-records.png'
import Price52WeeksRange from 'stocks/components/Price52WeeksRange.jsx'

const columns = [
  { 
    field: 'ticker', 
    headerName: 'Ticker', 
    width: 70 
  },
  { 
    field: 'sector', 
    headerName: 'Sector', 
    width: 120 
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
    field: 'range',
    headerName: '52 Weeks Range',
    width: 120,
    renderCell: (params) => (
      params.value
    )
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
    width: 60,
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
    width: 70,
  },
  {
    field: 'annualIncomeAfterTax',
    headerName: 'AIT',
    width: 70,
  },
];

const HoldingsList = (props) => {

    const { holdings, isFetching } = props;
    const taxRate = 30 
    const marketData = useSelector(selectMarketData)
    const stocksData = useSelector(selectStocksData)
    const holdingsData = marketData.filter(d => holdings.findIndex(h => d.T === h.ticker) !== -1)
    let totalValue = 0
    
    let rowsData = holdings.map(holding => {
      const priceData = holdingsData.find(d => d.T === holding.ticker)
      const stockDetailData = stocksData.find(d => d.symbol === holding.ticker)
      const price = priceData?.c ?? stockDetailData?.regularMarketPrice
      const shares = holding.shares
      const cost = shares* holding.cost
      const value = shares * price
      totalValue += value
      const annualYield = stockDetailData?.trailingAnnualDividendYield
      const dividendAmount = stockDetailData?.trailingAnnualDividendRate
      const annualIncome = dividendAmount * shares
      const annualIncomeAfterTax = annualIncome * (100 - taxRate)/100
      const yieldOnCost = annualIncome / cost
      const fiveYearDividendGrowth = holding.fiveYearDividendGrowth/100
      const sector = Sectors[holding.sector]
      const fiftyTwoWeekHigh = stockDetailData?.fiftyTwoWeekHigh
      const fiftyTwoWeekLow = stockDetailData?.fiftyTwoWeekLow
      const range = <Price52WeeksRange low={fiftyTwoWeekLow} high={fiftyTwoWeekHigh} price={price}/>
      return {
        ...holding,
        cost: formatCurrencyNumber(cost),
        price: formatCurrencyNumber(price),
        unformattedValue: value,
        value: formatCurrencyNumber(value),
        returnPercentage: getReturnPercentage(value, cost),
        return: formatCurrencyNumber(value - cost),
        yield: formatPercentage(annualYield),
        annualIncome: formatCurrencyNumber(annualIncome),
        yoc: formatPercentage(yieldOnCost),
        annualIncomeAfterTax: formatCurrencyNumber(annualIncomeAfterTax),
        fiveYearDividendGrowth: formatPercentage(fiveYearDividendGrowth),
        sector: sector,
        range: range
      }
    })

    //push after mapping values
    rowsData.forEach(r => {
      r.weight = formatPercentage(r.unformattedValue / totalValue)
    })

    return (
      <DataGrid
      rows={rowsData}
      columns={columns}
      autoPageSize
      components={{
        NoRowsOverlay: CustomNoRowsOverlay,
      }}
      disableSelectionOnClick
      disableVirtualization
      getRowId={(row) => row.id}
      headerHeight={40}
      loading={isFetching}
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
