import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import { stylesTheme, colorsTheme } from 'mui/theme.js';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={stylesTheme}>
        <ThemeProvider theme={colorsTheme}>
          <App />
        </ThemeProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
