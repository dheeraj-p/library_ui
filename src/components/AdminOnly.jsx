import { useAuth } from '../common/auth';

const AdminOnly = ({ children }) => {
  const auth = useAuth();
  if (auth.isAdmin()) {
    return <>{children}</>;
  }

  return <></>;
};

export default AdminOnly;
