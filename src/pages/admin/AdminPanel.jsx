import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import AppHeader from '../../components/AppHeader';
import { AutoStories, LibraryAdd, QrCode2 } from '@mui/icons-material';
import { Link } from '@tanstack/react-router';

const adminActions = [
  {
    title: 'Add New Book',
    subtitle: 'Allows adding multiple copies of a new book',
    Icon: LibraryAdd,
    path: '/admin/add-book',
  },
  {
    title: 'QR Codes',
    subtitle: 'Get QR codes for added books',
    Icon: QrCode2,
    path: '/admin/qr-codes',
  },
  {
    title: 'Borrowed Books',
    subtitle: 'See all the books borrowed by people',
    Icon: AutoStories,
    path: '/admin/borrowed-books',
  },
];

const AdminAction = ({ title, subtitle, path, icon }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton LinkComponent={Link} to={path}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} secondary={subtitle} />
      </ListItemButton>
    </ListItem>
  );
};

const AdminPanel = () => {
  return (
    <>
      <AppHeader />
      <Box flexGrow={1}>
        <Typography variant="h6" ml={2} mt={2}>
          Manage Library
        </Typography>
        <List>
          {adminActions.map(({ title, subtitle, path, Icon }, i) => {
            return (
              <AdminAction
                key={i}
                title={title}
                subtitle={subtitle}
                path={path}
                icon={<Icon color="primary" fontSize="large" />}
              />
            );
          })}
        </List>
      </Box>
    </>
  );
};

export default AdminPanel;
