import { useAuth } from '../providers/auth';
import { useState } from 'react';
import { Alert, Button, Stack } from '@mui/material';
import { Google } from '@mui/icons-material';
import useAPI from '../api/client';
import { useNavigate } from '@tanstack/react-router';

const containerStyle = {
  justifyContent: 'center',
  height: '100svh',
  pr: 2,
  pl: 2,
  alignItems: 'center',
  backgroundImage: 'url("bg.png")',
  backgroundSize: 'auto 100svh',
};

const LoginPage = () => {
  const [err, setError] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const { registerUser } = useAPI();

  const initiateAuth = () => {
    auth
      .login()
      .then(registerUser)
      .then(() => navigate({ to: '/', replace: true }))
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Stack sx={containerStyle}>
      {err && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {err}
        </Alert>
      )}
      <Button onClick={initiateAuth} variant="contained" startIcon={<Google />}>
        Signin with Google
      </Button>
    </Stack>
  );
};

export default LoginPage;
