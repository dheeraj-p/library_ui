import { ArrowBack, Logout } from '@mui/icons-material';
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { useAuth } from '../providers/auth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const { logout, user } = useAuth();
  const canGoBack = window.history.state.idx !== 0;
  const navigate = useNavigate();

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
          {user.displayName}
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
