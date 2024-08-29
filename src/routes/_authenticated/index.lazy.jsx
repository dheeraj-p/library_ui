import { createLazyFileRoute } from '@tanstack/react-router';
import AppHeader from '../../components/AppHeader';
import DashboardContent from '../../components/DashboardContent';

export const Route = createLazyFileRoute('/_authenticated/')({
  component: () => {
    return (
      <>
        <AppHeader />
        <DashboardContent />
      </>
    );
  },
});
