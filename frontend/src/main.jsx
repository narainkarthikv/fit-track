import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoot } from './AppRoot';
import { initializeAxiosAuthInterceptor } from './utils/axiosAuthInterceptor';

initializeAxiosAuthInterceptor();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>
);
