import React from 'react';
import { useTheme, Stack, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { formatCurrencyNumber, formatPercentage } from 'util/Utility'
import LeaderBoardIcon from '@mui/icons-material/Leaderboard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import InsightsIcon from '@mui/icons-material/Insights';
import DiversificationChart from 'stocks/components/DiversificationChart';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import { selectHoldingData } from 'services/holdingSlice';

const Dashboard = () => {
  return (
    <DashboardCards/>
  );
}

const DashboardCards = () => {
  const holdingsData = useSelector(selectHoldingData)
  const {
    totalValueUnformatted, totalAnnualIncome, 
    totalCostUnformatted, totalReturnUnformatted, 
    returnPercentage, totalDividendGrowth, 
    stocksWithDividendThisMonth=[]
  } = holdingsData || {}
  const totalValue = totalValueUnformatted
  const returns = totalReturnUnformatted
  const annualIncome = totalAnnualIncome
  const annualYield = totalAnnualIncome / totalCostUnformatted
  const averageDividendGrowth = totalDividendGrowth

  return (
    <Stack width='100%' height='100%' justifyContent='center' alignItems='center'>
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
          value={<Stack direction='row' spacing={1}>
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
          description={
          <Stack width='150px' height='140px'><DiversificationChart/></Stack>}
          />
        </Stack>
      </Paper>
    </Stack>
  );
}

const InfoCard = ({title, description, value, icon}) => {
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
      <Typography variant='h6' type='bold'>
        {value}
      </Typography>
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

export default Dashboard;
