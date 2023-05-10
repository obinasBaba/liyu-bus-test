import { Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import s from '../hr.module.scss';

export function HeroHeader(props) {
  const theme = useTheme();
  // const breakpoint = useMediaQuery(theme.breakpoints.up('xxl' as any));
  const match = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <header className={s.hero_about}>
      <Typography variant={match ? 'h3' : 'h2'}>
        All your travel options in one place
      </Typography>
      <Typography variant="body1">Book your bus tickets with ease!</Typography>
    </header>
  );
}
