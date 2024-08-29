import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/admin')({
  beforeLoad: ({ context }) => {
    const { auth } = context;
    if (!auth.isAdmin()) throw redirect({ to: '/', replace: true });
  },
});
