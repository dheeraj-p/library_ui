import RequireAuth from '../components/RequireAuth';
import AppHeader from '../components/AppHeader';
import UserRoleProvider from '../providers/role';
import DashboardContent from '../components/DashboardContent';
import { Box } from '@mui/material';

const Dashboard = () => {
  return (
    <RequireAuth>
      <UserRoleProvider>
        <Box flexDirection="column" height="100vh" display="flex">
          <AppHeader />
          <DashboardContent />
        </Box>
      </UserRoleProvider>
    </RequireAuth>
  );
};

export default Dashboard;
