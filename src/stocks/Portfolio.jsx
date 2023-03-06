import React from 'react';
import { Box, Stack, Divider } from '@mui/material';
import AddHoldingDialog from 'stocks/components/AddHoldingDialog'
import EditHoldingDialog from 'stocks/components/EditHoldingDialog'
import OutdatedDataDisclaimer from 'stocks/components/OutdatedDataDisclaimer'
import HoldingsList from 'stocks/components/HoldingsList'
import { isNullOrEmpty } from 'util/Utility';
import { useGetAllHoldingsQuery } from 'services/api'
import LabelValue from 'common-components/basic/LabelValue.jsx'
import { selectStocksData } from 'services/stocksDataSlice';
import { getReturnPercentage, formatCurrencyNumber, formatPercentage } from 'util/Utility'
import Price52WeeksRange from 'stocks/components/Price52WeeksRange.jsx'
import { useSelector } from 'react-redux';
import { TaxRate } from 'util/Constants'

const Portfolio = () => {
  const holdingsApi = useGetAllHoldingsQuery()
  const {data, totalValue, totalReturn, totalReturnUnformatted, returnPercentage} = GenerateHoldingsData()

  return (
    <Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column'}}>
      <Box sx={{height: '50px', width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
        <Stack direction='row' spacing={1} alignItems="center" mb='4px'>
          <LabelValue 
          label="Total Return" 
          value={`${totalReturn} (${returnPercentage})`} 
          sx={{mr:'8px', color: totalReturnUnformatted > 0 ? 'green' : 'red'}}
          />
          <Divider orientation="vertical" variant="middle" flexItem sx={{mx:'8px'}}/>
          <LabelValue 
          label="Total Value" 
          value={totalValue} 
          sx={{paddingLeft:'8px', pr: '16px'}}
          />
          <EditHoldingDialog/>
          <AddHoldingDialog/>
        </Stack>
      </Box>
      <HoldingsList
      rows={data}/>
      {!isNullOrEmpty(holdingsApi.data) &&
      <OutdatedDataDisclaimer sx={{marginBottom:'-16px'}}/>}
    </Box>
  );
}

function GenerateHoldingsData(){
  const holdingsApi = useGetAllHoldingsQuery()
  const stocksData = useSelector(selectStocksData)
  let totalValue = 0
  let totalCost = 0

  let rowsData = holdingsApi.data?.map(holding => {
    const priceData = stocksData.find(d => d.T === holding.ticker)
    const stockDetailData = stocksData.find(d => d.symbol === holding.ticker)
    const price = priceData?.c ?? stockDetailData?.regularMarketPrice
    const buyPrice = holding.cost
    const shares = holding.shares
    const cost = shares* buyPrice
    const value = shares * price
    totalValue += value
    totalCost += cost
    const annualYield = stockDetailData?.trailingAnnualDividendYield
    const dividendAmount = stockDetailData?.trailingAnnualDividendRate
    const annualIncome = dividendAmount * shares
    const annualIncomeAfterTax = annualIncome * (100 - TaxRate)/100
    const yieldOnCost = annualIncome / cost
    const fiveYearDividendGrowth = holding.fiveYearCAGR/10
    const sector = holding.sector
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
      range: range,
      buyPrice: buyPrice
    }
  })

  //push after mapping values
  rowsData?.forEach(r => {
    r.weight = formatPercentage(r.unformattedValue / totalValue)
  })

  return {
    data: rowsData,
    totalValue: formatCurrencyNumber(totalValue),
    totalReturnUnformatted: totalValue - totalCost,
    totalReturn: formatCurrencyNumber(totalValue - totalCost),
    returnPercentage: getReturnPercentage(totalValue, totalCost)
  }
}

export default Portfolio;
