import { createTheme, alpha } from '@mui/material/styles';

export const lightTokens = {
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
  },
  surface: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#6B7280',
    muted: '#9CA3AF',
    inverse: '#FFFFFF',
  },
  interactive: {
    default: '#3B82F6',
    hover: '#2563EB',
    active: '#1D4ED8',
    disabled: '#D1D5DB',
  },
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  border: {
    primary: '#E5E7EB',
    subtle: '#F0F0F0',
  },
};

export const darkTokens = {
  background: {
    primary: '#0B1118',
    secondary: '#121B26',
  },
  surface: {
    primary: '#121B26',
    secondary: '#0F1822',
    overlay: 'rgba(2, 10, 18, 0.65)',
  },
  text: {
    primary: '#EAF2F6',
    secondary: '#9FB0C3',
    muted: '#7C8CA0',
    inverse: '#0B1118',
  },
  interactive: {
    default: '#3B82F6',
    hover: '#2563EB',
    active: '#1E4FBF',
    disabled: '#1F2C3B',
  },
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  border: {
    primary: '#1E2C3C',
    subtle: '#0F1822',
  },
};

export const getThemeTokens = (theme) => (theme === 'dark' ? darkTokens : lightTokens);

export const generateThemeCSS = (theme) => {
  const tokens = getThemeTokens(theme);
  const prefix = theme === 'dark' ? 'dark' : 'light';

  return `
    :root[data-theme="${prefix}"] {
      --color-bg-primary: ${tokens.background.primary};
      --color-bg-secondary: ${tokens.background.secondary};

      --color-surface-primary: ${tokens.surface.primary};
      --color-surface-secondary: ${tokens.surface.secondary};
      --color-surface-overlay: ${tokens.surface.overlay};

      --color-text-primary: ${tokens.text.primary};
      --color-text-secondary: ${tokens.text.secondary};
      --color-text-muted: ${tokens.text.muted};
      --color-text-inverse: ${tokens.text.inverse};

      --color-action-default: ${tokens.interactive.default};
      --color-action-hover: ${tokens.interactive.hover};
      --color-action-active: ${tokens.interactive.active};
      --color-action-disabled: ${tokens.interactive.disabled};

      --color-success: ${tokens.success};
      --color-error: ${tokens.error};
      --color-warning: ${tokens.warning};

      --color-border-primary: ${tokens.border.primary};
      --color-border-subtle: ${tokens.border.subtle};
    }
  `;
};

export const getAppTheme = (mode = 'dark') => {
  const colors = getThemeTokens(mode);
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.interactive.default,
        light: '#60A5FA',
        dark: colors.interactive.active,
      },
      secondary: {
        main: colors.interactive.default,
      },
      background: {
        default: colors.background.primary,
        paper: colors.surface.primary,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
      },
      divider: colors.border.primary,
      success: {
        main: colors.success,
      },
      error: {
        main: colors.error,
      },
      warning: {
        main: colors.warning,
      },
      info: {
        main: colors.interactive.default,
      },
    },

    typography: {
      fontFamily: ['"Sora"', 'ui-sans-serif', 'system-ui', 'sans-serif'].join(','),
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.25,
        '@media (max-width:600px)': {
          fontSize: '2rem',
        },
      },
      h2: {
        fontSize: '2.25rem',
        fontWeight: 700,
        lineHeight: 1.25,
        '@media (max-width:600px)': {
          fontSize: '1.75rem',
        },
      },
      h3: {
        fontSize: '1.875rem',
        fontWeight: 600,
        lineHeight: 1.25,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.25,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.25,
      },
      h6: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.25,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
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
            backgroundColor: colors.background.primary,
            color: colors.text.primary,
          },
          '#root': {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          },
          '::selection': {
            backgroundColor: colors.interactive.default,
            color: colors.text.inverse,
          },
          '::-webkit-scrollbar': {
            width: '10px',
            height: '10px',
          },
          '::-webkit-scrollbar-track': {
            background: colors.background.secondary,
          },
          '::-webkit-scrollbar-thumb': {
            background: colors.border.primary,
            borderRadius: '999px',
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: colors.interactive.hover,
          },
          '.react-calendar-heatmap': {
            width: '100%',
            height: 'auto',
          },
          '.react-calendar-heatmap .react-calendar-heatmap-small-text': {
            fontSize: '6px',
            fill: colors.text.secondary,
          },
          '.react-calendar-heatmap rect': {
            rx: 6,
            ry: 6,
            transition: 'transform 0.2s ease, fill 0.2s ease',
          },
          '.react-calendar-heatmap rect:hover': {
            transform: 'scale(1.05)',
            stroke: colors.interactive.default,
            strokeWidth: 1,
          },
          '.react-calendar-heatmap .color-empty': {
            fill: colors.border.primary,
          },
          '.react-calendar-heatmap .color-scale-1': {
            fill: alpha(colors.interactive.default, 0.45),
          },
          '.react-calendar-heatmap .color-scale-2': {
            fill: alpha(colors.interactive.default, 0.7),
          },
          '.react-calendar-heatmap .color-scale-3': {
            fill: colors.interactive.default,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: 8,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&.Mui-disabled': {
              backgroundColor: colors.interactive.disabled,
              color: colors.text.muted,
            },
          },
          contained: {
            backgroundColor: colors.interactive.default,
            color: colors.text.inverse,
            '&:hover': {
              backgroundColor: colors.interactive.hover,
              boxShadow: `0 8px 20px ${alpha(colors.interactive.default, 0.3)}`,
              transform: 'translateY(-1px)',
            },
            '&:active': {
              backgroundColor: colors.interactive.active,
            },
          },
          outlined: {
            borderColor: colors.border.primary,
            color: colors.text.primary,
            '&:hover': {
              backgroundColor: colors.background.secondary,
              borderColor: colors.interactive.default,
            },
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: colors.surface.primary,
            backgroundImage: 'none',
            boxShadow: isDark
              ? '0 8px 20px rgba(6, 12, 18, 0.45)'
              : '0 6px 16px rgba(15, 23, 42, 0.08)',
            transition: 'box-shadow 0.2s ease',
            '&:hover': {
              boxShadow: isDark
                ? '0 12px 28px rgba(6, 12, 18, 0.55)'
                : '0 10px 24px rgba(15, 23, 42, 0.12)',
            },
          },
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: colors.surface.secondary,
              color: colors.text.primary,
              '& fieldset': {
                borderColor: colors.border.primary,
              },
              '&:hover fieldset': {
                borderColor: colors.interactive.default,
              },
              '&.Mui-focused fieldset': {
                borderColor: colors.interactive.default,
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: colors.text.muted,
              opacity: 1,
            },
          },
        },
      },

      MuiInputBase: {
        styleOverrides: {
          root: {
            color: colors.text.primary,
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: colors.surface.primary,
            boxShadow: isDark
              ? '0 6px 18px rgba(6, 12, 18, 0.45)'
              : '0 4px 14px rgba(15, 23, 42, 0.08)',
            borderBottom: `1px solid ${colors.border.primary}`,
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: colors.surface.primary,
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none',
            borderRadius: 24,
            boxShadow: isDark
              ? `0 24px 60px ${colors.surface.overlay}`
              : '0 18px 42px rgba(15, 23, 42, 0.16)',
          },
        },
      },
    },
  });
};

const theme = getAppTheme('dark');

export default theme;
