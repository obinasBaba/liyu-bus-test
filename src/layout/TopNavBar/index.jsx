import React from 'react';
import { Slide, useScrollTrigger } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import NavBar from './navbar';
import s from './navbar.module.scss';

import { isMobile } from 'react-device-detect';
import clsx from 'clsx';

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const TopNavBar = props => {
  return (
    <HideOnScroll {...props}>
      <div
        color="transparent"
        className={clsx([s.container, isMobile && s.mobile])}
      >
        <NavBar />
      </div>
    </HideOnScroll>
  );
};

export default TopNavBar;
