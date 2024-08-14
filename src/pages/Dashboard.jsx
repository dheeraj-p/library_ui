import { useAuth } from '../providers/auth';
import RequireAuth from '../components/RequireAuth';
import AppHeader from '../components/AppHeader';

const Dashboard = () => {
  return (
    <RequireAuth>
      <AppHeader />
    </RequireAuth>
  );
};

export default Dashboard;
