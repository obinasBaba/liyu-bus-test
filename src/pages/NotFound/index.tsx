import React from 'react';
import s from './notfound.module.scss';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const NotFound = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.ver}>
          <Typography variant="h1">404</Typography>
          <Typography variant="h5">Page not found</Typography>
        </div>

        <Link to="/">
          <Button variant="contained" size="large" startIcon={<ArrowBack />}>
            Go back to home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
