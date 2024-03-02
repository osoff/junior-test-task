'use client';

import React, { useState } from 'react';

import { Button, Stack, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Filters from './Filters';

function AdsListHead() {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <Stack
      direction="row"
      gap="20px"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h3" component="h1">
        List of ads
      </Typography>
      <div>
        <Button
          sx={{ gap: 2 }}
          variant="outlined"
          onClick={() => setOpenFilter(true)}
        >
          <Typography>Filters</Typography>
          <FilterAltIcon />
        </Button>
      </div>
      <Filters open={openFilter} setOpen={setOpenFilter} />
    </Stack>
  );
}

export default AdsListHead;
