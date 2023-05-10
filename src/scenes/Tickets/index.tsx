import React from 'react';
import s from './ticketpayment.module.scss';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

const TicketsPage = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Stack direction="row" spacing={3}>
          <TextField
            variant="outlined"
            type="text"
            label="Enter Your Ticket Number"
            placeholder="Search"
            fullWidth
            sx={{ maxWidth: '20rem' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <Button variant="outlined" size="large">
            Search
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default TicketsPage;
