import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getAppTheme } from './theme/theme';
import store from './store/store';
import { initializeAxiosAuthInterceptor } from './utils/axiosAuthInterceptor';

initializeAxiosAuthInterceptor();

const THEME_MODE_KEY = 'fitprogressr-theme-mode';

const AppRoot = () => {
  const [themeMode, setThemeMode] = React.useState(() => {
    const savedMode = localStorage.getItem(THEME_MODE_KEY);
    return savedMode === 'light' ? 'light' : 'dark';
  });

  const theme = React.useMemo(() => getAppTheme(themeMode), [themeMode]);

  const handleToggleTheme = React.useCallback(() => {
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>
);
