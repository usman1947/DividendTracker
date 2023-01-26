import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectHoldings } from 'services/holdingSlice';
import AddHoldingDialog from 'stocks/components/AddHoldingDialog'
import { getAllHoldings } from 'database/holding';

const Portfolio = () => {
  const dispatch = useDispatch();
  const holdings = useSelector(selectHoldings)
  console.log('Logger:',holdings)
  async function fetchData(){
    await getAllHoldings(dispatch);
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <AddHoldingDialog/>
    <Button onClick={() => dispatch(fetchData)}>
      update
    </Button>
    </>
  );
}

export default Portfolio;
