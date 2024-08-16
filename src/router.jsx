import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import AddBooksBulk from './pages/AddBooksBulk';

const router = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: 'login', element: <LoginPage /> },
  { path: 'manage', element: <AdminPanel /> },
  { path: 'add-bulk', element: <AddBooksBulk /> },
]);

export default router;
