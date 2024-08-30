import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { createAuth, auth as firebaseAuth } from './common/auth.js';
import { routeTree } from './routeTree.gen';
import { authHelperAPIs, createApiClient } from './common/api_client.js';
import LoadingView from './components/LoadingView.jsx';

const router = createRouter({ routeTree });

const auth = createAuth(firebaseAuth, authHelperAPIs);
const api = createApiClient(auth);
const theme = createTheme({
  palette: {
    primary: { main: '#c25b5b', contrastText: '#fff' },
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
        context={{ auth, api }}
        defaultPendingComponent={() => <LoadingView fullScreen />}
        defaultGcTime={0}
        defaultPendingMs={0}
      />
    </ThemeProvider>
  </React.StrictMode>
);
