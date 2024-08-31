import { createLazyFileRoute } from '@tanstack/react-router';
import AdminPanel from '../../../pages/admin/AdminPanel';

export const Route = createLazyFileRoute('/_authenticated/admin/')({
  component: AdminPanel,
});
