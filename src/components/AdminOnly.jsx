import { useRole, UserRoles } from '../providers/role';

const AdminOnly = ({ children }) => {
  const role = useRole();
  if (role === UserRoles.MANAGER) {
    return <>{children}</>;
  }

  return <></>;
};

export default AdminOnly;
