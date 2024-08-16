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
import { LibraryAdd, QrCodeScanner } from '@mui/icons-material';

const AddBooksBulk = () => {
  return (
    <RequireAuth>
      <UserRoleProvider>
        <Box flexDirection="column" height="100vh" display="flex">
          <AppHeader />
          <Box flexGrow={1}>
            <Typography variant="h6" ml={2} mt={2}>
              Add Books Bulk
            </Typography>
            <List></List>
            <Fab
              color="primary"
              sx={{ position: 'fixed', bottom: 10, right: 10 }}
            >
              <QrCodeScanner />
            </Fab>
          </Box>
        </Box>
      </UserRoleProvider>
    </RequireAuth>
  );
};

export default AddBooksBulk;
