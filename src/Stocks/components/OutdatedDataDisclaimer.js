import React, { useContext } from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import { useLazyGetStockMarketDataQuery } from 'services/api'
import { getLastBusinessDay } from 'util/Utility';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { PageSettings } from 'config/page-settings.js';

const OutdatedDataDisclaimer = ({sx}) => {
	const _context = useContext(PageSettings);
	const [trigger] = useLazyGetStockMarketDataQuery()
	const lastBusinessDay = getLastBusinessDay()

    async function updateMarketData(){
		trigger(lastBusinessDay, _context)
	}

  return (
      <Stack direction='row' width='100%' spacing={1} alignItems='center' justifyContent='flex-end' sx={sx}>
        <Typography variant='subtitle2'>
          *Disclaimer* Data is not updated periodically, To get latest market data please click refresh
        </Typography>
        <IconButton disableRipple size='small' onClick={updateMarketData}>
          <AutorenewIcon fontSize="small"/>
        </IconButton>
      </Stack>
  );
}

export default OutdatedDataDisclaimer;
