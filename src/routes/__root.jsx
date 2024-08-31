import { Box } from '@mui/material';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  beforeLoad: async ({ context }) => {
    await context.auth.loadState();
  },
  component: () => {
    return (
      <>
        <Box flexDirection="column" height="100svh" display="flex">
          <Outlet />
        </Box>
      </>
    );
  },
});
