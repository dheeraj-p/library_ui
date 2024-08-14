import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/auth';

const RequireAuth = ({ children }) => {
  const { isAuthReady, user } = useAuth();

  if (!isAuthReady) return <div>Loading App...</div>;

  if (!user) return <Navigate to={'/login'} replace />;

  return <>{children}</>;
};

export default RequireAuth;
