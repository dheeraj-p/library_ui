import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthProvider from './providers/auth.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
