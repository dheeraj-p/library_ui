import {
  Box,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import RequireAuth from '../components/RequireAuth';
import UserRoleProvider from '../providers/role';
import AppHeader from '../components/AppHeader';
import { LibraryAdd, QrCodeScanner, Send } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const openScanner = () => {};
  const openAddBulkPage = () => {
    navigate('/add-bulk');
  };

  return (
    <RequireAuth>
      <UserRoleProvider>
        <Box flexDirection="column" height="100vh" display="flex">
          <AppHeader />
          <Box flexGrow={1}>
            <Typography variant="h6" ml={2} mt={2}>
              Manage Library
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={openAddBulkPage}>
                  <ListItemIcon>
                    <LibraryAdd color="primary" fontSize="large" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Add Books"
                    secondary="Add multiple books"
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Fab
              color="primary"
              sx={{ position: 'fixed', bottom: 10, right: 10 }}
              onClick={openScanner}
            >
              <QrCodeScanner />
            </Fab>
          </Box>
        </Box>
      </UserRoleProvider>
    </RequireAuth>
  );
};

export default AdminPanel;
