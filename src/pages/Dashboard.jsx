import RequireAuth from '../components/RequireAuth';
import AppHeader from '../components/AppHeader';
import UserRoleProvider from '../providers/role';

const Dashboard = () => {
  return (
    <RequireAuth>
      <UserRoleProvider>
        <AppHeader />
      </UserRoleProvider>
    </RequireAuth>
  );
};

export default Dashboard;
