import { Alert, Box, Button, Fab, TextField, Typography } from '@mui/material';
import RequireAuth from '../components/RequireAuth';
import UserRoleProvider from '../providers/role';
import AppHeader from '../components/AppHeader';
import { QrCodeScanner } from '@mui/icons-material';
import { useState } from 'react';
import BarcodeScanner from '../components/BarcodeScanner';
import useAPI from '../api/client';
import { BookNotFoundError } from '../api/errors';

const textFieldStyle = {
  mb: 2,
};

const formContainerStyle = {
  pr: 2,
  pl: 2,
  pt: 2,
  flexGrow: 1,
};

const formInitialData = {
  title: '',
  isbn10: '',
  isbn13: '',
  authors: [],
};

const AddBooksBulk = () => {
  const [isScannerOpened, setScannerOpened] = useState(false);
  const [scannedISBN, setScannedISBN] = useState('');
  const [alertData, setAlertData] = useState({
    severity: 'info',
    message: 'Please fill the form OR scan code',
  });

  const [bookData, setBookData] = useState(formInitialData);
  const [numberOfCopies, setNumberOfCopies] = useState(1);
  const { registerBook, fetchBookInfo } = useAPI();

  const openScanner = () => setScannerOpened(true);
  const closeScanner = () => {
    setScannerOpened(false);
  };

  const handleError = (err) => {
    if (err instanceof BookNotFoundError) {
      setAlertData({
        severity: 'warning',
        message: "Can't fetch book details. Please add the book manually.",
      });
      return;
    }

    setAlertData({
      severity: 'error',
      message: 'Ooops! Unknown error occured.',
    });
    console.warn('Unhanled error: ', err);
  };

  const updateTitle = (e) => {
    setBookData({ ...bookData, title: e.target.value });
  };

  const updateISBN10 = (e) => {
    setBookData({ ...bookData, isbn10: e.target.value });
  };

  const updateISBN13 = (e) => {
    setBookData({ ...bookData, isbn13: e.target.value });
  };

  const updateAuthors = (e) => {
    setBookData({ ...bookData, authors: e.target.value.split(',') });
  };

  const processISBN = (isbn) => {
    setAlertData({ severity: 'info', message: 'Fetching book data...' });
    fetchBookInfo(isbn)
      .then((bookData) => {
        setScannedISBN(isbn);
        setBookData(bookData);
        setAlertData({
          severity: 'success',
          message: 'Please confirm book information and continue.',
        });
      })
      .catch(handleError);
    closeScanner();
  };

  const addBook = () => {
    setAlertData({
      severity: 'info',
      message: 'Adding book to library...',
    });
    registerBook({
      bookData,
      isbn: scannedISBN,
      copies: numberOfCopies,
    })
      .then(() => {
        setAlertData({
          severity: 'success',
          message: 'Yayy! Book added to library.',
        });
        setBookData(formInitialData);
      })
      .catch(handleError);
  };

  const isFormDataValid = () => {
    if (bookData.title?.length == 0) return false;
    if (bookData.isbn10?.length == 0 && bookData.isbn13?.length == 0) {
      return false;
    }

    if (numberOfCopies < 1) return false;

    return true;
  };

  const shouldSubmit = isFormDataValid();

  return (
    <RequireAuth>
      <UserRoleProvider>
        <Box flexDirection="column" height="100vh" display="flex">
          <AppHeader />
          <Box flexGrow={1} display="flex" flexDirection="column">
            <Typography variant="h6" ml={2} mt={2}>
              Add Book
            </Typography>
            <Box component="form" autoComplete="off" sx={formContainerStyle}>
              <Alert severity={alertData.severity} sx={{ mb: 2 }}>
                {alertData.message}
              </Alert>
              <TextField
                label="Title*"
                variant="outlined"
                value={bookData.title}
                onChange={updateTitle}
                fullWidth
                sx={textFieldStyle}
              />
              <TextField
                label="ISBN 10"
                variant="outlined"
                value={bookData.isbn10}
                fullWidth
                sx={textFieldStyle}
                onChange={updateISBN10}
              />
              <TextField
                label="ISBN 13"
                variant="outlined"
                value={bookData.isbn13}
                fullWidth
                sx={textFieldStyle}
                onChange={updateISBN13}
              />
              <TextField
                label="Authors (comma separated)"
                variant="outlined"
                value={bookData.authors?.join(',')}
                fullWidth
                sx={textFieldStyle}
                onChange={updateAuthors}
              />
              <TextField
                label="Number of copies"
                type="number"
                variant="outlined"
                value={numberOfCopies}
                fullWidth
                sx={textFieldStyle}
                onChange={(e) => setNumberOfCopies(+e.target.value)}
              />
            </Box>
            <Button
              variant="outlined"
              sx={{
                mb: 2,
                mr: 10,
                ml: 2,
              }}
              disabled={!shouldSubmit}
              onClick={addBook}
            >
              Add Book
            </Button>
            <Fab
              color="primary"
              sx={{ position: 'fixed', bottom: 10, right: 10 }}
              onClick={openScanner}
            >
              <QrCodeScanner />
            </Fab>
          </Box>
        </Box>
        <BarcodeScanner
          opened={isScannerOpened}
          onCancel={closeScanner}
          onResult={processISBN}
        />
      </UserRoleProvider>
    </RequireAuth>
  );
};

export default AddBooksBulk;
