import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: 'login', element: <LoginPage /> },
]);

export default router;
