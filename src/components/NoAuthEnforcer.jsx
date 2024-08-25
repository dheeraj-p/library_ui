import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/auth';

const NoAuthEnforcer = ({ children }) => {
  const { isAuthReady, user, isDomainVerified } = useAuth();

  if (!isAuthReady) return <div>Loading App...</div>;

  if (user && isDomainVerified) return <Navigate to={'/'} replace />;

  return <>{children}</>;
};

export default NoAuthEnforcer;
