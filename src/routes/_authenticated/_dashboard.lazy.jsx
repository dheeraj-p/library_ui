import { AutoStories, LibraryBooks, ListAlt } from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from '@mui/material';
import {
  createLazyFileRoute,
  Outlet,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useState } from 'react';
import AppHeader from '../../components/AppHeader';

export const Route = createLazyFileRoute('/_authenticated/_dashboard')({
  component: () => {
    const { history } = useRouter();
    const navigate = useNavigate();
    const pathname = history.location.pathname;
    const [currentPage, setCurrentPage] = useState(pathname);

    const updatePage = (_, page) => {
      setCurrentPage(page);
      navigate({ to: page });
    };

    return (
      <>
        <AppHeader canGoBack={false} />
        <Box flexGrow={1}>
          <Outlet />
        </Box>
        <Paper>
          <BottomNavigation
            showLabels
            value={currentPage}
            onChange={updatePage}
          >
            <BottomNavigationAction
              value="/"
              label="Books"
              icon={<LibraryBooks />}
            />
            <BottomNavigationAction
              value="/currently-reading"
              label="Reading"
              icon={<AutoStories />}
            />
            <BottomNavigationAction
              value="/request-new"
              label="Request"
              icon={<ListAlt />}
            />
          </BottomNavigation>
        </Paper>
      </>
    );
  },
});
