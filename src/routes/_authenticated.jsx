import { createFileRoute, redirect } from '@tanstack/react-router';
import { UnauthorizedUser, UnknownDomainError } from '../common/errors';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const { auth } = context;
    if (!auth.isAuthenticated()) {
      throw redirect({ to: '/login' });
    }

    try {
      await auth.verifyAndInit();
    } catch (err) {
      if (
        err instanceof UnknownDomainError ||
        err instanceof UnauthorizedUser
      ) {
        //Logout to flush out inconsitent state
        await auth.logout();
        throw redirect({ to: '/login' });
      }

      console.error('Auth Error:', err);
      throw err;
    }
  },
});
