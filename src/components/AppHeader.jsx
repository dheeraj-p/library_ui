import { Logout } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useAuth } from '../providers/auth';
import { useRole } from '../providers/role';

const AppHeader = () => {
  const { logout } = useAuth();
  const userRole = useRole();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          STEP Library ({userRole})
        </Typography>
        <IconButton
          edge="start"
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
