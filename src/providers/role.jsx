import { createContext, useContext, useEffect, useState } from 'react';
import useAPI from '../api/client';

const UserRoles = {
  READER: 'READER',
  MANAGER: 'MANAGER',
};

const UserRoleContext = createContext(null);

const UserRoleProvider = ({ children }) => {
  const [role, setRole] = useState(UserRoles.READER);
  const { getUserRole } = useAPI();

  useEffect(() => {
    getUserRole().then(setRole);
  }, []);

  return (
    <UserRoleContext.Provider value={role}>{children}</UserRoleContext.Provider>
  );
};

const useRole = () => useContext(UserRoleContext);

export default UserRoleProvider;

export { useRole, UserRoles };
