import { Virtuoso } from 'react-virtuoso';
import useAPI from '../common/api_client';
import { useState } from 'react';
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
import { QrCodeScanner } from '@mui/icons-material';
import { formatToLocale, getRelativeTimeString } from '../common/utils/date';
import BarcodeScanner from '../components/BarcodeScanner';
import { useLoaderData, useNavigate } from '@tanstack/react-router';
import BookCover from '../components/BookCover';

const containerStyle = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
};

const fabStyle = { mr: 1, mb: 1, position: 'absolute', right: 0, bottom: 0 };

const BookRow = ({ book, index }) => {
  const borrowedDate = new Date(book.borrowed_on + 'Z');
  const authorText = book.authors.join(', ');

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar sx={{ mr: 2, alignSelf: 'center' }}>
        <BookCover title={book.title} author={authorText} index={index} />
      </ListItemAvatar>
      <Stack alignSelf="stretch">
        <ListItemText primary={book.title} secondary={`by ${authorText}`} />
        <Typography variant="caption">
          {`${formatToLocale(borrowedDate)} (${getRelativeTimeString(borrowedDate)})`}
        </Typography>
      </Stack>
    </ListItem>
  );
};

const CurrentlyReading = () => {
  const books = useLoaderData({});
  const [isScannerOpened, setScannerOpened] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ opened: false });
  const navigate = useNavigate();
  const { returnBook } = useAPI();

  const refresh = () => {
    navigate({ to: '.', replace: true });
  };

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

  const showError = (message) => openSnackbar({ message, severity: 'error' });
  const showInfo = (message) => openSnackbar({ message, severity: 'info' });
  const showSuccess = (message) =>
    openSnackbar({ message, severity: 'success' });

  const processCopyId = (qrData) => {
    showInfo('Processing...');
    const [copyId] = qrData.split('||');
    returnBook(copyId)
      .then((res) => {
        showSuccess('Book returned, keep reading. :)');
        refresh();
      })
      .catch((_) => showError('Oops! Unknown Error'));

    closeScanner();
  };

  return (
    <Box sx={containerStyle}>
      <Virtuoso
        style={{ flexGrow: 1 }}
        totalCount={books.length}
        itemContent={(index) => {
          const book = books[index];
          return <BookRow book={book} index={index} key={index} />;
        }}
        components={{
          EmptyPlaceholder: () => {
            return (
              <Box sx={containerStyle}>
                <Typography variant="body1">
                  You are not reading any book at the moment
                </Typography>
              </Box>
            );
          },
        }}
      />
      {books.length > 0 && (
        <Fab
          color="primary"
          variant="extended"
          sx={fabStyle}
          onClick={openScanner}
        >
          <QrCodeScanner sx={{ mr: 1 }} />
          Return
        </Fab>
      )}

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

export default CurrentlyReading;
