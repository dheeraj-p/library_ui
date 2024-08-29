import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const { auth } = context;
    if (!auth.isAuthenticated()) {
      throw redirect({ to: '/login' });
    }

    try {
      await auth.verifyAndInit();
    } catch (err) {
      console.error('Auth Error:', err);
      //Logout to flush out inconsitent state
      await auth.logout();
      throw redirect({ to: '/login' });
    }
  },
});
