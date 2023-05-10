import React from 'react';
import s from './intro.module.scss';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

const Intro = () => {
  return (
    <div className={s.container}>
      <header>
        <Typography variant="h3" mb={0}>
          About Us
        </Typography>
        <Typography variant="body1" color="#e74f00">
          Who We Are & What We Do
        </Typography>
      </header>

      <Stack spacing={2} className={s.content}>
        <Typography variant="body1">
          Gozo Mobility is a company that works on transportation services in
          rural areas. We aim to make transportation convenient and affordable
          for everyone, especially those who live in remote locations. We offer
          a range of options, such as electric vehicles, electric bicycles, and
          wheelchair ramps, to suit different needs and preferences. We also use
          renewable energy sources, such as solar and wind, to power our
          vehicles and reduce our environmental impact.
        </Typography>

        <Typography variant="body1">
          We have been operating since 2018, and we are proud to be the only
          sustainable choice for electric vehicle purchase and hire in Gozo. We
          believe that everyone deserves access to safe, reliable, and
          eco-friendly transportation. That's why we are committed to providing
          the best service possible to our customers and partners.
        </Typography>

        <Typography variant="body1">
          Whether you need a ride to work, school, or leisure, Gozo Mobility is
          here to help you get around Malta's small island that delivers big
          experiences. Contact us today to find out more about our services and
          how we can help you.
        </Typography>
      </Stack>
    </div>
  );
};

export default Intro;
