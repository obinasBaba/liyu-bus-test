import { Link, useLocation } from 'react-router-dom';
import { Badge, Box, Stack, Typography } from '@mui/material';
import s from './navbar.module.scss';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store';
import { Moment } from 'moment';
import { Timelapse } from '@mui/icons-material';
import ErrorBoundary from '../../components/ErrorBoundary';
import clsx from 'clsx';
import { isMobile } from 'react-device-detect';
import { LoadingButton } from '@mui/lab';
import { useAppContext } from '../../components/context/AppContext';
import appRoutes from '../../utils/routes';

const links = [
  // { name: 'home', path: '/' },
  // { name: 'tickets', path: '/tickets' },
  {
    name: 'about',
    path: '/about-us',
  },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

const NavBar = () => {
  const [countDown, setCountDown] = useState<Moment | undefined>();

  const { setShowAuthModal: showModal } = useAppContext();

  const bookingDetail = useSelector(
    (state: StoreType) => state.booking.bookingDetail,
  );

  const paymentDetail = useSelector(
    (state: StoreType) => state.booking.paymentDetail,
  );

  // use active pathname to highlight the current page
  const { pathname } = useLocation();

  useEffect(() => {
    if (paymentDetail?.payed) {
      return;
    }

    if (bookingDetail && bookingDetail?.createdAt) {
      setCountDown(moment(new Date(bookingDetail.createdAt)));
    }
  }, [bookingDetail, paymentDetail]);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return null;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <div className={clsx([s.toolbar, isMobile && s.mobile])}>
      <ErrorBoundary fallback="something wrong">
        <Link to="/">
          <span className="mr-3 h-6 sm:h-9 text-2xl">LIYU</span>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={2} alignItems="center">
          <LoadingButton
            size="large"
            variant="contained"
            sx={{ mr: '.5rem' }}
            onClick={() => showModal(true)}
          >
            Login
          </LoadingButton>

          <Link
            to="/"
            className={clsx([s.nav_item, pathname === '/' && s.active])}
          >
            <Typography> Home </Typography>
          </Link>

          <Link
            to={appRoutes.TICKETS}
            className={clsx([
              s.nav_item,
              pathname === appRoutes.TICKETS && s.active,
            ])}
          >
            <Stack direction="row" spacing={0} alignItems="center">
              <Typography> Tickets </Typography>

              {(countDown || paymentDetail?.payed) && (
                <Badge
                  className={s.badge}
                  badgeContent={
                    paymentDetail?.payed ? (
                      '1'
                    ) : (
                      <Countdown
                        date={countDown.add(1, 'hour').toDate()}
                        autoStart
                        renderer={renderer}
                        className={s.countdown_container}
                      />
                    )
                  }
                  color="info"
                >
                  <Timelapse fontSize="medium" />
                </Badge>
              )}
            </Stack>
          </Link>

          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={clsx([s.nav_item, pathname === link.path && s.active])}
            >
              <Typography> {link.name} </Typography>
            </Link>
          ))}
        </Stack>
      </ErrorBoundary>
    </div>
  );
};

export default NavBar;
