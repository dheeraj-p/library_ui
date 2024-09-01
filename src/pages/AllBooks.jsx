import { useState } from 'react';
import useAPI from '../common/api_client';
import { Virtuoso } from 'react-virtuoso';
import {
  Alert,
  Box,
  Fab,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { ManageAccounts, QrCodeScanner } from '@mui/icons-material';
import AdminOnly from '../components/AdminOnly';
import BarcodeScanner from '../components/BarcodeScanner';
import { CopyAlreadyBorrowed, CopyNotFound } from '../common/errors';
import { useLoaderData, useNavigate } from '@tanstack/react-router';
import BookCover from '../components/BookCover';

const Row = ({ book, index }) => {
  const authorsText = `by ${book.authors.join(', ')}`;

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar sx={{ mr: 2, alignSelf: 'center' }}>
        <BookCover title={book.title} index={index} author={book.authors[0]} />
      </ListItemAvatar>
      <Stack alignSelf={'stretch'}>
        <ListItemText
          primary={book.title}
          secondary={authorsText}
          sx={{ mb: 2 }}
        />
        <Typography variant="caption">
          {book.copies} copies, {book.borrowed_count} borrowed
        </Typography>
      </Stack>
    </ListItem>
  );
};

const AllBooks = () => {
  const books = useLoaderData({});
  const [isScannerOpened, setScannerOpened] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ opened: false });

  const { borrowBook } = useAPI();
  const navigate = useNavigate();

  const openScanner = () => setScannerOpened(true);
  const closeScanner = () => {
    setScannerOpened(false);
  };

  const closeSnackbar = () => {
    setSnackbarData({ opened: false });
  };

  const openSnackbar = (data) => {
    closeSnackbar();
    setSnackbarData({ ...data, opened: true, duration: 3000 });
  };

  const showWarning = (message) =>
    openSnackbar({ message, severity: 'warning' });

  const showError = (message) => openSnackbar({ message, severity: 'error' });
  const showInfo = (message) => openSnackbar({ message, severity: 'info' });
  const showSuccess = (message) =>
    openSnackbar({ message, severity: 'success' });

  const handleError = (err) => {
    if (err instanceof CopyAlreadyBorrowed) {
      showWarning(err.message);
      return;
    }

    if (err instanceof CopyNotFound) {
      showWarning(err.message);
      return;
    }

    showError('Oops! Unknown Error');
  };

  const processCopyId = (qrData) => {
    showInfo('Processing...');
    const [copyId] = qrData.split('||');
    borrowBook(copyId)
      .then((res) => {
        showSuccess('Book borrowed, happy reading :)');
      })
      .catch(handleError);

    closeScanner();
  };

  const openAdminPanel = () => {
    navigate({ to: '/admin' });
  };

  return (
    <Box display="flex" height="100%" flexDirection="column">
      <Box flexGrow={1}>
        <Virtuoso
          totalCount={books.length}
          itemContent={(index) => (
            <Row book={books[index]} key={index} index={index} />
          )}
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
        sx={{ mb: 7 }}
      >
        <Alert severity={snackbarData.severity}>{snackbarData.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AllBooks;
