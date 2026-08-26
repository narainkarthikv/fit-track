import { useCallback, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getAppTheme } from './theme/theme';
import store from './store/store';
import App from './App';

const THEME_MODE_KEY = 'fitprogressr-theme-mode';

export const AppRoot = () => {
  const [themeMode, setThemeMode] = useState(() => {
    const savedMode = localStorage.getItem(THEME_MODE_KEY);
    return savedMode === 'light' ? 'light' : 'dark';
  });

  const theme = useMemo(() => getAppTheme(themeMode), [themeMode]);

  const handleToggleTheme = useCallback(() => {
    setThemeMode((prevMode) => {
      const nextMode = prevMode === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_MODE_KEY, nextMode);
      return nextMode;
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App themeMode={themeMode} onToggleTheme={handleToggleTheme} />
      </ThemeProvider>
    </Provider>
  );
};
