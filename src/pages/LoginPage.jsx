import { useAuth } from '../common/auth';
import { useState } from 'react';
import { Alert, Button, Stack } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useNavigate } from '@tanstack/react-router';
import useAPI from '../common/api_client';

import AppLogo from '../assets/Logo';
import LoadingView from '../components/LoadingView';

const containerStyle = {
  justifyContent: 'center',
  height: '100svh',
  pr: 2,
  pl: 2,
  alignItems: 'center',
  backgroundSize: 'auto 100svh',
};

const LoginPage = () => {
  const [err, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const { registerUser } = useAPI();

  const initiateAuth = () => {
    setLoading(true);
    auth
      .login()
      .then(registerUser)
      .then(() => navigate({ to: '/', replace: true }))
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  if (isLoading) return <LoadingView fullScreen message="Logging In..." />;

  return (
    <Stack sx={containerStyle}>
      <AppLogo scale={1.8} sx={{ mb: 6 }} />
      <Button onClick={initiateAuth} variant="contained" startIcon={<Google />}>
        Signin with Google
      </Button>
      {err && (
        <Alert
          severity="error"
          sx={{ position: 'fixed', top: 0, width: '100svw' }}
        >
          {err}
        </Alert>
      )}
    </Stack>
  );
};

export default LoginPage;
