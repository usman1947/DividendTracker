import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { stylesTheme, colorsTheme } from 'mui/theme.js';
import { BrowserRouter } from 'react-router-dom';
import { deepmerge } from '@mui/utils';

const theme = createTheme(deepmerge(stylesTheme, colorsTheme));

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
