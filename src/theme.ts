import { createTheme, responsiveFontSizes } from '@mui/material';

export const theme = responsiveFontSizes(
  createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200, // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        xxl: 1600, // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        xxxl: 1900,
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize',
            borderRadius: '5000px',
          },
          outlined: {},
        },
      },
      MuiAlert: {
        styleOverrides: {
          standardWarning: {
            border: 'thin solid  #ed6c02',
          },
          standardInfo: {
            border: 'thin solid  #0288d1',
          },
        },
      },
    },

    typography: {
      // fontFamily: 'poppins, sans-serif',
      fontFamily: 'SofiaPro, sans-serif',
    },

    palette: {
      text: {
        // primary: '#000000',
      },
      primary: {
        main: '#e74f00',
      },
      secondary: {
        main: '#C5C5C5',
      },
    },
  }),
);
