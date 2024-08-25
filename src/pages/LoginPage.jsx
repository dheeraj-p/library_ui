import { useAuth } from '../providers/auth';
import NoAuthEnforcer from '../components/NoAuthEnforcer';
import { registerUser } from '../api/client';
import { useState } from 'react';

const LoginPage = () => {
  const [err, setError] = useState(null);
  const { signin, setDomainVerified } = useAuth();

  const initiateAuth = () => {
    signin({
      onSuccess({ user }) {
        //Returning an IIFE Promise here, so that onError get call in case of error
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
      <div>
        {err && <p>{err}</p>}
        <button onClick={initiateAuth}>Signin with Google</button>
      </div>
    </NoAuthEnforcer>
  );
};

export default LoginPage;
