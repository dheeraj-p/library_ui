import { ArrowBack, Logout } from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  Link,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Link as RouterLink,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { useAuth } from '../common/auth';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const AppHeader = ({ canGoBack = true }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { history } = useRouter();
  const user = auth.getUser();

  const logout = async () => {
    await auth.logout();
    navigate({ to: '/login', replace: true });
  };

  const nameInitials = user.displayName
    .split(' ')
    .map((p) => p[0])
    .join('');

  const goBack = () => {
    history.back();
  };

  return (
    <>
      <AppBar position="fixed">
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
      <Offset />
    </>
  );
};

export default AppHeader;
