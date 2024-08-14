import { useAuth } from '../providers/auth';

const NoAuthEnforcer = ({ children }) => {
  const { isAuthReady, user } = useAuth();

  if (!isAuthReady) return <div>Loading App...</div>;

  if (user) return <Navigate to={'/'} replace />;

  return <>{children}</>;
};

export default NoAuthEnforcer;
