import { useAuth } from '../providers/auth';
import RequireAuth from '../components/RequireAuth';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <RequireAuth>
      <div>
        <p>Yayy!! You are in dashboard</p>
        <button onClick={logout}>Logout</button>
      </div>
    </RequireAuth>
  );
};

export default Dashboard;
