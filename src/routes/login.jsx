import { createFileRoute, redirect } from '@tanstack/react-router';
import LoginPage from '../pages/LoginPage';

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    const { auth } = context;
    if (auth.isAuthenticated()) throw redirect({ to: '/' });
  },
  component: LoginPage,
});
