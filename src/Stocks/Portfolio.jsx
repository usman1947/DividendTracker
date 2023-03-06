import React from 'react';
import { Box, Stack } from '@mui/material';
import AddHoldingDialog from 'stocks/components/AddHoldingDialog'
import EditHoldingDialog from 'stocks/components/EditHoldingDialog'
import OutdatedDataDisclaimer from 'stocks/components/OutdatedDataDisclaimer'
import HoldingsList from 'stocks/components/HoldingsList'
import { isNullOrEmpty } from 'util/Utility';
import { useGetAllHoldingsQuery } from 'services/api'

const Portfolio = () => {
  const holdingsApi = useGetAllHoldingsQuery()

  return (
    <Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column'}}>
      <Box sx={{height: '50px', width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
        <Stack direction='row' spacing={1} alignItems="center">
          <EditHoldingDialog/>
          <AddHoldingDialog/>
        </Stack>
      </Box>
      <HoldingsList/>
      {!isNullOrEmpty(holdingsApi.data) &&
      <OutdatedDataDisclaimer sx={{marginBottom:'-16px'}}/>}
    </Box>
  );
}

export default Portfolio;
