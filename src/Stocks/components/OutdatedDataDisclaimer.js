import React from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import { useLazyGetStockMarketDataQuery, useLazyGetStocksDataQuery } from 'services/api'
import { getLastBusinessDay } from 'util/Utility';
import AutoRenewIcon from '@mui/icons-material/Autorenew';

const OutdatedDataDisclaimer = ({sx, holdings}) => {

  const [triggerGetMarketData, {isFetching: isFetchingMarketData}] = useLazyGetStockMarketDataQuery()
	const [triggerGetStocksData, {isFetching: isFetchingStocksData}] = useLazyGetStocksDataQuery()

  async function updateMarketData(){
    const lastBusinessDay = getLastBusinessDay()
    const tickers = holdings.map(r => r.ticker).join(',')
    triggerGetMarketData(lastBusinessDay)
    triggerGetStocksData(tickers)
	}

  return (
      <Stack direction='row' width='100%' spacing={1} alignItems='center' justifyContent='flex-end' sx={sx}>
        <Typography variant='subtitle2'>
          *Disclaimer* Market data is not updated periodically, To get latest market data please click refresh
        </Typography>
        <IconButton disableRipple size='small' onClick={updateMarketData}
        disabled={isFetchingMarketData || isFetchingStocksData}>
          <AutoRenewIcon fontSize="small"/>
        </IconButton>
      </Stack>
  );
}

export default OutdatedDataDisclaimer;
