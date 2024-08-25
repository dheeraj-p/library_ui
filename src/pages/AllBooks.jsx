import { useEffect, useState } from 'react';
import useAPI from '../api/client';
import { Virtuoso } from 'react-virtuoso';
import {
  Alert,
  Box,
  Fab,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  Typography,
} from '@mui/material';
import { ManageAccounts, MenuBook, QrCodeScanner } from '@mui/icons-material';
import AdminOnly from '../components/AdminOnly';
import { useNavigate } from 'react-router-dom';
import BarcodeScanner from '../components/BarcodeScanner';
import { CopyAlreadyBorrowed } from '../api/errors';

const Row = ({ book }) => {
  const authorsText = `by ${book.authors.join(', ')}`;
  const isNotAvailable = book.copies === book.borrowed_count;

  return (
    <ListItem>
      <ListItemAvatar>
        <MenuBook color="primary" fontSize="large" />
      </ListItemAvatar>
      <ListItemText
        primary={book.title}
        secondary={authorsText}
        sx={{ flex: '2' }}
      />
      <Box alignSelf="center" textAlign={'end'} flex={'1'}>
        {isNotAvailable && (
          <Typography variant="caption">All Borrowed</Typography>
        )}
      </Box>
    </ListItem>
  );
};

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [isScannerOpened, setScannerOpened] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ opened: false });

  const { getAllBooks, borrowBook } = useAPI();
  const navigate = useNavigate();

  useEffect(() => {
    getAllBooks().then(setBooks);
  }, []);

  const openScanner = () => setScannerOpened(true);
  const closeScanner = () => {
    setScannerOpened(false);
  };

  const closeSnackbar = () => {
    setSnackbarData({ opened: false });
  };

  const handleError = (err) => {
    if (err instanceof CopyAlreadyBorrowed) {
      closeSnackbar();
      setSnackbarData({
        opened: true,
        severity: 'warning',
        message: err.message,
      });
    }
  };

  const processCopyId = (copyId) => {
    setSnackbarData({
      opened: true,
      severity: 'info',
      message: `Processing...`,
    });

    borrowBook(copyId)
      .then((res) => {})
      .catch();
    closeScanner();
  };

  const openAdminPanel = () => {
    navigate('/manage');
  };

  return (
    <Box display="flex" height="100%" flexDirection="column">
      <Box flexGrow={1}>
        <Virtuoso
          totalCount={books.length}
          itemContent={(index) => <Row book={books[index]} />}
        />
      </Box>

      <Box alignSelf="flex-end">
        <Fab color="primary" sx={{ mr: 1, mb: 1 }} onClick={openScanner}>
          <QrCodeScanner />
        </Fab>
        <AdminOnly>
          <Fab
            variant="extended"
            color="primary"
            sx={{ mr: 1, mb: 1 }}
            onClick={openAdminPanel}
          >
            <ManageAccounts sx={{ mr: 1 }} />
            Manage
          </Fab>
        </AdminOnly>
      </Box>
      <BarcodeScanner
        opened={isScannerOpened}
        onCancel={closeScanner}
        onResult={processCopyId}
      />
      <Snackbar
        open={snackbarData.opened}
        autoHideDuration={snackbarData.duration}
        onClose={closeSnackbar}
      >
        <Alert severity={snackbarData.severity}>{snackbarData.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AllBooks;
