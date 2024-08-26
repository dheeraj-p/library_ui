import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import AddBooksBulk from './pages/AddBooksBulk';
import QRCodes from './pages/QRCodes';

const router = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: 'login', element: <LoginPage /> },
  { path: 'manage', element: <AdminPanel /> },
  { path: 'add-bulk', element: <AddBooksBulk /> },
  { path: 'qr-codes', element: <QRCodes /> },
]);

export default router;
