import React from 'react';
import { useTheme, Stack, Paper, Typography, List } from '@mui/material';
import { useSelector } from 'react-redux';
import { formatCurrencyNumber, formatPercentage } from 'util/Utility'
import LeaderBoardIcon from '@mui/icons-material/Leaderboard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import InsightsIcon from '@mui/icons-material/Insights';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import { selectHoldingData } from 'services/holdingSlice';
import PieChart from 'stocks/components/PieChart.jsx';
import { orderBy } from 'lodash'

const dashboardWidth = '942px'

const Dashboard = () => {
  return (
    <Stack width='100%' height='100%' justifyContent='center' alignItems='center' spacing={5}>
      <DashboardCards/>
      <TopDividendPayers/>
    </Stack>
  );
}

const DashboardCards = () => {
  const holdingsData = useSelector(selectHoldingData)
  const {
    data, totalValueUnformatted, totalAnnualIncome, 
    totalCostUnformatted, totalReturnUnformatted, 
    returnPercentage, totalDividendGrowth, 
    stocksWithDividendThisMonth=[]
  } = holdingsData || {}
  const totalValue = totalValueUnformatted
  const returns = totalReturnUnformatted
  const annualIncome = totalAnnualIncome
  const annualYield = totalAnnualIncome / totalCostUnformatted
  const averageDividendGrowth = totalDividendGrowth
  const sectors = data?.reduce((acc, { sector }) => {
    acc[sector] = (acc[sector] || 0) + 1;
    return acc;
  }, {});

  return (
    <Stack width={dashboardWidth} height='100%' justifyContent='center' alignItems='center'>
      <Paper elevation={8}>
        <Stack direction='row'>
          <InfoCard
          title='Income'
          description='Your annual income after tax'
          value={formatCurrencyNumber(annualIncome)}
          icon={<LeaderBoardIcon fontSize='large' sx={{color:'info.main'}}/>}
          />
          <InfoCard
          title='Balance & Performance'
          description='Your portfolio returns'
          content={<Stack direction='row' spacing={1}>
            <Typography variant='h6' type='bold'>
              {formatCurrencyNumber(returns)}
            </Typography>
            <Typography variant='h6' type='bold' color={returns > 0 ? 'colors.green' : 'colors.red'}>
              ({returnPercentage})
            </Typography>
          </Stack>}
          icon={<PriceChangeOutlinedIcon fontSize='large' sx={{color:'info.main'}}/>}
          />
          <InfoCard
          title='Valuation'
          description='Your annual dividend yield on cost'
          value={formatPercentage(annualYield)}
          icon={
          <Typography variant='body2' color='secondary.main' sx={{textAlign: 'center'}}>
            <ThisMonthDividendText stocks={stocksWithDividendThisMonth}/>
          </Typography>}
          />
        </Stack>
        <Stack direction='row'>
          <InfoCard
          title='Total Value'
          description='Your portfolio`s total value today'
          value={formatCurrencyNumber(totalValue)}
          icon={<ShowChartIcon fontSize='large' sx={{color:'info.main'}}/>}
          />
          <InfoCard
          title='Dividend Growth'
          description='Annual dividend growth rate'
          value={formatPercentage(averageDividendGrowth)}
          icon={
          <InsightsIcon fontSize='large' sx={{color:'info.main'}}/>}
          />
          <InfoCard
          title='Diversification'
          content={
          <Stack width='150px' height='140px'>
            {sectors &&
            <PieChart 
            values={Object.values(sectors)} 
            labels={Object.keys(sectors)}
            legendConfig={{
              display: false,
            }}
            />}
          </Stack>}
          />
        </Stack>
      </Paper>
    </Stack>
  );
}

const InfoCard = ({title, description, value, content, icon}) => {
  const theme = useTheme()
  return (
    <Stack width='280px' height='200px' justifyContent='center' alignItems='center' px='16px'
    sx={{border: `1px solid ${theme.palette.secondary.shades['12p']}`}}>
      <Typography variant='h5' color='info.main'>
        {title}
      </Typography>
      <Typography variant='body2'>
        {description}
      </Typography>
      {content ? content :
      <Typography variant='h6' type='bold'>
        {value}
      </Typography>}
      {icon}
    </Stack>
  )
}

const ThisMonthDividendText = ({stocks}) => {
  if (stocks.length === 0) {
    return "None of your stocks will pay dividend this month :("
  } else if (stocks.length <= 2){
    return `${stocks.join(', ')} in your portfolio will pay their dividends this month`
  } else {
    return `${stocks.slice(0, 2).join(', ')} and ${stocks.slice(2).length} other in your portfolio will pay their dividends this month`
  }
}

const TopDividendPayers = () => {
  const holdingsData = useSelector(selectHoldingData)
  const {
    data
  } = holdingsData || {}

  const sortedData = orderBy(data, 'annualIncomeAfterTaxUnformatted', 'desc')
  const annualIncome = sortedData?.map(stock => stock.annualIncomeAfterTaxUnformatted)
  const stocks = sortedData?.map((stock) => stock.ticker)
  
  return (
    holdingsData?.data &&
    <Paper sx={{width: dashboardWidth, height:'400px', display: 'flex'}}elevation={8}
    direction='row' justifyContent='space-between'>
      <Stack width='40%' height='100%' spacing={3} sx={{p: '32px 32px 0 32px'}}>
        <Typography variant='h4' color='info.main'>
          Top Dividend Payers
        </Typography>
        <List>
          {sortedData.map((stock, i) => (
            i < 7 &&
            <Stack key={i} direction='row' justifyContent='space-between'>
              <Typography variant='h6'>
                {stock.displayName} ({stock.ticker})
              </Typography>
              <Typography variant='h6' type='bold'>
                {formatCurrencyNumber(stock.annualIncomeAfterTaxUnformatted)}
              </Typography>
            </Stack>
          ))}
        </List>
      </Stack>
      <Stack width='60%' height='100%' pr='32px' sx={{zIndex:6}} alignItems='flex-end'>
        <PieChart 
        values={annualIncome} 
        labels={stocks}
        legendConfig={{ position: 'right'}}
        />
      </Stack>
    </Paper>
  );
}

export default Dashboard;
