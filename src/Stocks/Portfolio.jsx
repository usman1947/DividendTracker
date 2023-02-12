import React from 'react';
import { Box, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectHoldings, isFetchingHoldings } from 'services/holdingSlice';
import AddHoldingDialog from 'stocks/components/AddHoldingDialog'
import EditHoldingDialog from 'stocks/components/EditHoldingDialog'
import OutdatedDataDisclaimer from 'stocks/components/OutdatedDataDisclaimer'
import HoldingsList from 'stocks/components/HoldingsList'
import { isNullOrEmpty } from 'util/Utility';

const Portfolio = () => {
  const holdings = useSelector(selectHoldings)
  const isFetching = useSelector(isFetchingHoldings)

  return (
    <Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column'}}>
      <Box sx={{height: '50px', width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
        <Stack direction='row' spacing={1} alignItems="center">
          <EditHoldingDialog/>
          <AddHoldingDialog currentHoldings={holdings}/>
        </Stack>
      </Box>
      <HoldingsList 
      holdings={holdings}
      isFetching={isFetching}
      />
      {!isNullOrEmpty(holdings) &&
      <OutdatedDataDisclaimer sx={{marginBottom:'-16px'}} holdings={holdings}/>}
    </Box>
  );
}

export default Portfolio;
