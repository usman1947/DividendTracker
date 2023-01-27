import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectHoldings } from 'services/holdingSlice';
import AddHoldingDialog from 'stocks/components/AddHoldingDialog'
import HoldingsList from 'stocks/components/HoldingsList'
import { getAllHoldings } from 'database/holding';

const Portfolio = () => {
  const dispatch = useDispatch();
  const holdings = useSelector(selectHoldings)

  async function fetchData(){
    await getAllHoldings(dispatch);
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column'}}>
      <Box sx={{height: '50px', width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
        <AddHoldingDialog/>
      </Box>
      {holdings.length > 0 &&
      <HoldingsList 
      sx={{flex: 1}}
      holdings={holdings}
      />}
    </Box>
  );
}

export default Portfolio;
