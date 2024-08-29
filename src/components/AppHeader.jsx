import { ArrowBack, Logout } from '@mui/icons-material';
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../providers/auth';

const AppHeader = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const user = auth.getUser();

  const logout = async () => {
    await auth.logout();
    navigate({ to: '/login', replace: true });
  };

  const nameInitials = user.displayName
    .split(' ')
    .map((p) => p[0])
    .join('');

  // const canGoBack = window.history.state.idx !== 0;
  const canGoBack = false; //TODO: fix this for tanstack router
  const goBack = () => {
    navigate(-1);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {canGoBack ? (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="logout"
            onClick={goBack}
          >
            <ArrowBack />
          </IconButton>
        ) : (
          <></>
        )}

        <Link
          variant="h6"
          sx={{ flexGrow: 1 }}
          ml={1}
          color="inherit"
          underline="none"
          component={RouterLink}
          to="/"
          replace
        >
          STEP Library
        </Link>
        <Typography variant="body1" mr={1}>
          {nameInitials}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="logout"
          onClick={logout}
        >
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
