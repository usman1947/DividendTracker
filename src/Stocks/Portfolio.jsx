import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectHoldings } from 'services/holdingSlice';
import AddHoldingDialog from 'stocks/components/AddHoldingDialog'
import EditHoldingDialog from 'stocks/components/EditHoldingDialog'
import OutdatedDataDisclaimer from 'stocks/components/OutdatedDataDisclaimer'
import HoldingsList from 'stocks/components/HoldingsList'
import { isNullOrEmpty } from 'util/Utility';

const Portfolio = () => {
  const holdings = useSelector(selectHoldings)

  return (
    <Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column'}}>
      <Box sx={{height: '50px', width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
        <Stack direction='row' spacing={1} alignItems="center">
          <EditHoldingDialog/>
          <AddHoldingDialog/>
        </Stack>
      </Box>
      {isNullOrEmpty(holdings) ?
      <Skeleton/> : 
      <HoldingsList 
      sx={{flex: 1}}
      holdings={holdings}
      />}
      <OutdatedDataDisclaimer sx={{marginBottom:'-16px'}} holdings={holdings}/>
    </Box>
  );
}

export default Portfolio;
