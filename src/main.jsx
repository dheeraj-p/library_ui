import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { createAuth, auth as firebaseAuth } from './common/auth.js';
import { routeTree } from './routeTree.gen';
import { authHelperAPIs, createApiClient } from './common/api_client.js';
import LoadingView from './components/LoadingView.jsx';
import ErrorPlaceHolder from './components/ErrorPlaceholder.jsx';
import { createBookStore } from './common/book_store.js';

const router = createRouter({ routeTree });

const auth = createAuth(firebaseAuth, authHelperAPIs);
const api = createApiClient(auth);
const bookStore = createBookStore(api.getAllBooks);

const theme = createTheme({
  palette: {
    primary: { main: '#2F4858', contrastText: '#ffffff' },
    secondary: { main: '#c25b5b', contrastText: '#ffffff' },
    background: { default: 'white' },
    info: { main: 'rgb(76,92,115)' },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <RouterProvider
        router={router}
        context={{ auth, api, bookStore }}
        defaultPendingComponent={() => <LoadingView fullScreen />}
        defaultErrorComponent={ErrorPlaceHolder}
        defaultGcTime={0}
        defaultPendingMs={0}
      />
    </ThemeProvider>
  </React.StrictMode>
);
