import { useAuth } from '../providers/auth';
import NoAuthEnforcer from '../components/NoAuthEnforcer';
import { registerUser } from '../api/client';
import { useState } from 'react';
import { Alert, Button, Stack } from '@mui/material';
import { Google } from '@mui/icons-material';

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
  const { signin, setDomainVerified } = useAuth();

  const initiateAuth = () => {
    signin({
      onSuccess({ user }) {
        // Returning an IIFE Promise here, so that onError gets called in case of error
        return (async () => {
          const token = await user.getIdToken();
          await registerUser(token);
          setDomainVerified(true);
        })();
      },
      onError(err) {
        setDomainVerified(false);
        setError(err.message);
      },
    });
  };

  return (
    <NoAuthEnforcer>
      <Stack sx={containerStyle}>
        {err && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {err}
          </Alert>
        )}
        <Button
          onClick={initiateAuth}
          variant="contained"
          startIcon={<Google />}
        >
          Signin with Google
        </Button>
      </Stack>
    </NoAuthEnforcer>
  );
};

export default LoginPage;
