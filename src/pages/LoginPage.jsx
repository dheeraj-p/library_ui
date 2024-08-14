import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth';
import NoAuthEnforcer from '../components/NoAuthEnforcer';

const LoginPage = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const initiateAuth = () => {
    signin({
      onSuccess() {
        navigate('/', { replace: true });
      },
    });
  };

  return (
    <NoAuthEnforcer>
      <div>
        <button onClick={initiateAuth}>Signin with Google</button>
      </div>
    </NoAuthEnforcer>
  );
};

export default LoginPage;
