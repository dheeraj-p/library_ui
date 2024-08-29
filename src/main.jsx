import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { createAuth, auth as firebaseAuth } from './providers/auth.jsx';
import { routeTree } from './routeTree.gen';
import { authHelperAPIs, createApiClient } from './api/client.js';

const router = createRouter({ routeTree });

const auth = createAuth(firebaseAuth, authHelperAPIs);
const api = createApiClient(auth);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider
      router={router}
      context={{ auth, api }}
      defaultPendingComponent={() => <div>Global Loading</div>}
    />
  </React.StrictMode>
);
