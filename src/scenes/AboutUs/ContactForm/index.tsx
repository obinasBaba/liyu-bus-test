import React from 'react';
import s from './contactform.module.scss';
import Typography from '@mui/material/Typography';
import { Stack, TextField } from '@mui/material';
import { Phone, Send } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

const ContactForm = () => {
  return (
    <div className={s.container}>
      <header>
        <Typography variant="h3" mb={0}>
          Contact Us
        </Typography>
        <Typography variant="body1" color="#e74f00">
          get in touch
        </Typography>
      </header>

      <Stack className={s.content}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Phone color="primary" />
          <Typography color="#e74f00">+251 112 154 154</Typography>
          <Typography>or send us a message below</Typography>
        </Stack>

        <Stack mt={2} spacing={1}>
          <TextField label="Your Email" type="email" variant="outlined" />
          <TextField
            label="Your Message"
            type="text"
            variant="outlined"
            multiline
            rows={4}
          />
          <LoadingButton endIcon={<Send />} variant="contained" size="large">
            Send
          </LoadingButton>
        </Stack>
      </Stack>
    </div>
  );
};

export default ContactForm;
