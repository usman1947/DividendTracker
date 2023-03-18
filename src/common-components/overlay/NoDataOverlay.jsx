import React from 'react';
import { Stack, Typography } from '@mui/material';
import NoRecordsImage from 'assets/no-records.png'

export const NoDataOverlay = () => {
    return (
      <Stack with='100%' height='100%' alignItems='center' justifyContent='center'>
        <img src={NoRecordsImage} alt=""/>
        <Typography variant='subtitle1'>
          No holdings added, Please click +ADD to add holdings
        </Typography>
      </Stack>
    );
}

export default NoDataOverlay;