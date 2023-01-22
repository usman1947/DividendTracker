import React from 'react';
import { Button } from '@mui/material';
import { getAllHoldings, createHolding } from 'database/holding.js'

const Portfolio = () => {
  getAllHoldings()
  return (
    <Button onClick={() => createHolding('AAPL', 5, 140)}>
      Add Holding
    </Button>
  );
}

export default Portfolio;
