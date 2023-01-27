import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { 
    field: 'ticker', 
    headerName: 'Ticker', 
    width: 90 
},
  {
    field: 'shares',
    headerName: 'Shares',
    width: 100,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    width: 100,
  }
];


const HoldingsList = (props) => {

    const { holdings } = props;

    return (
      <DataGrid
      rows={holdings}
      columns={columns}
      autoPageSize
      disableSelectionOnClick
      disableVirtualization
      getRowId={(row) => row._id}
      />
    );
}

export default HoldingsList
