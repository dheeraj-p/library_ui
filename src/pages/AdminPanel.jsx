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

import AppHeader from '../components/AppHeader';
import { LibraryAdd, QrCode2, QrCodeScanner } from '@mui/icons-material';
import { useNavigate } from '@tanstack/react-router';

const AdminAction = ({ title, subtitle, onClick, icon }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} secondary={subtitle} />
      </ListItemButton>
    </ListItem>
  );
};

const AdminPanel = () => {
  const navigate = useNavigate();

  const openAddBulkPage = () => {
    navigate({ to: '/admin/add-book' });
  };

  const openQRCodesPage = () => {
    navigate({ to: '/admin/qr-codes' });
  };

  return (
    <>
      <AppHeader />
      <Box flexGrow={1}>
        <Typography variant="h6" ml={2} mt={2}>
          Manage Library
        </Typography>
        <List>
          <AdminAction
            title="Add New Book"
            subtitle="Allows adding multiple copies of a new book"
            onClick={openAddBulkPage}
            icon={<LibraryAdd color="primary" fontSize="large" />}
          />
          <AdminAction
            title="QR Codes"
            subtitle="Get QR codes for added books"
            onClick={openQRCodesPage}
            icon={<QrCode2 color="primary" fontSize="large" />}
          />
        </List>
      </Box>
    </>
  );
};

export default AdminPanel;
