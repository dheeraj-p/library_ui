import { Box } from '@mui/material';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  beforeLoad: async ({ context }) => {
    await context.auth.loadState();
  },
  component: () => (
    <>
      <Box flexDirection="column" height="100svh" display="flex">
        <Outlet />
        <TanStackRouterDevtools />
      </Box>
    </>
  ),
});
