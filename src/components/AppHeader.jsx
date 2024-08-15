import { Logout } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useAuth } from '../providers/auth';

const AppHeader = () => {
  const { logout, user } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          STEP Library
        </Typography>
        <Typography variant="body1" mr={4}>
          {user.displayName}
        </Typography>
        <IconButton color="inherit" aria-label="logout" onClick={logout}>
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
