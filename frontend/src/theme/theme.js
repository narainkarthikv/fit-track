import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4A90E2',   // Calm blue
      light: '#6FA8EB',
      dark: '#357ABD',
    },
    secondary: {
      main: '#2C3E50',   // Blue-gray slate
      light: '#3E556B',
      dark: '#1B2836',
    },
    background: {
      default: '#0E1621', // Blue-tinted dark
      paper: '#16202E',
    },
    text: {
      primary: '#E6EDF3', // Soft white
      secondary: '#9FB3C8',
    },
    success: {
      main: '#4CAF9A',
    },
    error: {
      main: '#EF5350',
    },
    warning: {
      main: '#F2A365',
    },
    info: {
      main: '#5DA9E9',
    },
  },

  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '0.5px',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.65,
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.55,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          transition: 'opacity 0.2s ease',
        },
        contained: {
          backgroundColor: '#4A90E2',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#357ABD',
            opacity: 0.9,
          },
        },
        outlined: {
          borderColor: '#4A90E2',
          color: '#4A90E2',
          '&:hover': {
            backgroundColor: 'rgba(74, 144, 226, 0.08)',
            borderColor: '#357ABD',
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#16202E',
          backgroundImage: 'none',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          transition: 'box-shadow 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#1F2A3A',
            color: '#E6EDF3',
            '& fieldset': {
              borderColor: '#34495E',
            },
            '&:hover fieldset': {
              borderColor: '#6FA8EB',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#4A90E2',
            },
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#9FB3C8',
            opacity: 1,
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#E6EDF3',
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#16202E',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#16202E',
        },
      },
    },
  },
});

export default theme;
