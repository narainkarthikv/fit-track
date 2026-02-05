import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3B82F6',
      light: '#6EA8FF',
      dark: '#1E4FBF',
    },
    secondary: {
      main: '#60A5FA',
      light: '#93C5FD',
      dark: '#2563EB',
    },
    background: {
      default: '#0B1118',
      paper: '#121B26',
    },
    text: {
      primary: '#EAF2F6',
      secondary: '#9FB0C3',
    },
    success: {
      main: '#22C55E',
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F59E0B',
    },
    info: {
      main: '#3B82F6',
    },
  },

  typography: {
    fontFamily: ['"Sora"', '"Manrope"', 'sans-serif'].join(','),
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
    borderRadius: 16,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          minHeight: '100vh',
          backgroundColor: '#0B1118',
          backgroundImage:
            'radial-gradient(circle at top left, rgba(59, 130, 246, 0.2), transparent 35%), radial-gradient(circle at 15% 25%, rgba(96, 165, 250, 0.12), transparent 45%)',
          color: '#EAF2F6',
        },
        '#root': {
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
        '::selection': {
          backgroundColor: '#3B82F6',
          color: '#0B1118',
        },
        '::-webkit-scrollbar': {
          width: '10px',
          height: '10px',
        },
        '::-webkit-scrollbar-track': {
          background: '#0F1822',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#1F2C3B',
          borderRadius: '999px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#2B3B50',
        },
        '.react-calendar-heatmap': {
          width: '100%',
          height: 'auto',
        },
        '.react-calendar-heatmap .react-calendar-heatmap-small-text': {
          fontSize: '6px',
          fill: '#9FB0C3',
        },
        '.react-calendar-heatmap rect': {
          rx: 6,
          ry: 6,
          transition: 'transform 0.2s ease, fill 0.2s ease',
        },
        '.react-calendar-heatmap rect:hover': {
          transform: 'scale(1.05)',
          stroke: '#60A5FA',
          strokeWidth: 1,
        },
        '.react-calendar-heatmap .color-empty': {
          fill: '#1A2532',
        },
        '.react-calendar-heatmap .color-scale-1': {
          fill: '#60A5FA',
        },
        '.react-calendar-heatmap .color-scale-2': {
          fill: '#3B82F6',
        },
        '.react-calendar-heatmap .color-scale-3': {
          fill: '#1E40AF',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: 999,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        },
        contained: {
          backgroundColor: '#3B82F6',
          color: '#0B1118',
          '&:hover': {
            backgroundColor: '#2563EB',
            boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: '#3B82F6',
          color: '#3B82F6',
          '&:hover': {
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            borderColor: '#2563EB',
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#121B26',
          backgroundImage: 'none',
          boxShadow: '0 8px 20px rgba(6, 12, 18, 0.45)',
          transition: 'box-shadow 0.2s ease',
          '&:hover': {
            boxShadow: '0 12px 28px rgba(6, 12, 18, 0.55)',
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#0F1822',
            color: '#E6EDF3',
            '& fieldset': {
              borderColor: '#1E2C3C',
            },
            '&:hover fieldset': {
              borderColor: '#3B82F6',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3B82F6',
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
          backgroundColor: '#121B26',
          boxShadow: '0 6px 18px rgba(6, 12, 18, 0.45)',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#121B26',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          borderRadius: 24,
          boxShadow: '0 24px 60px rgba(2, 10, 18, 0.65)',
        },
      },
    },
  },
});

export default theme;
