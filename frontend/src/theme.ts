import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
    },
    subtitle1: {
      color: '#666666',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#000000',
          '&:hover': {
            backgroundColor: '#333333',
          },
        },
      },
    },
  },
});

export default theme;
