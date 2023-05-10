import React from 'react';
import s from './aboutus.module.scss';
import Intro from './Intro';
import TheTeam from './TheTeam';
import ContactForm from './ContactForm';
import { Container } from '@mui/material';

const AboutUs = () => {
  return (
    <div className={s.container}>
      <Container maxWidth={'xl' as any} className={s.wrapper}>
        <Intro />
        <TheTeam />
        <ContactForm />
      </Container>
    </div>
  );
};

export default AboutUs;
