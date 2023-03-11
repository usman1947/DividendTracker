import React from 'react';
import { Stack, Paper, Typography, List } from '@mui/material';
import { formatCurrencyNumber } from 'util/Utility'
import PieChart from 'stocks/components/PieChart.jsx';
import { orderBy } from 'lodash'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const ChartWithListCard = (props) => {
    const { title, width, data, dataValueKey } = props
    const sortedDataByDataKeyValue = orderBy(data, dataValueKey, 'desc')
    const dataKeyValues = sortedDataByDataKeyValue?.map(stock => stock[dataValueKey])
    const sortedStockTickers = sortedDataByDataKeyValue?.map((stock) => stock.ticker)

    return (
      <Paper sx={{width: width, height:'400px', display: 'flex'}}elevation={8}
      direction='row' justifyContent='space-between'>
        <Stack width='40%' height='100%' spacing={3} sx={{p: '32px 32px 0 32px'}}>
          <Typography variant='h4' color='info.main'>
            {title}
          </Typography>
          <List>
            {data.map((stock, i) => (
              i < 7 &&
              <Stack key={i} direction='row' justifyContent='space-between'>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <DoubleArrowIcon fontSize='small' sx={{color: 'info.main'}}/>
                  <Typography variant='h6'>
                    {stock.displayName} ({stock.ticker})
                  </Typography>
                </Stack>
                <Typography variant='h6' type='bold'>
                  {formatCurrencyNumber(stock[dataValueKey])}
                </Typography>
              </Stack>
            ))}
          </List>
        </Stack>
        <Stack width='60%' height='100%' pr='32px' sx={{zIndex:6}} alignItems='flex-end'>
          <PieChart 
          values={dataKeyValues} 
          labels={sortedStockTickers}
          legendConfig={{ position: 'right'}}
          />
        </Stack>
      </Paper>
    );
}

export default ChartWithListCard