import { createLazyFileRoute } from '@tanstack/react-router';
import AdminPanel from '../../../pages/AdminPanel';

export const Route = createLazyFileRoute('/_authenticated/admin/')({
  component: AdminPanel,
});
