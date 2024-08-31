import { Alert, Box, Button, Fab, TextField, Typography } from '@mui/material';
import AppHeader from '../../components/AppHeader';
import { QrCodeScanner } from '@mui/icons-material';
import { useState } from 'react';
import BarcodeScanner from '../../components/BarcodeScanner';
import useAPI from '../../common/api_client';
import { BookNotFoundError } from '../../common/errors';
import ValidatedTextField from '../../components/ValidatedTextField';
import {
  isNotEmpty,
  isEmpty,
  validateBookTitle,
  validateISBN10,
  validateISBN13,
  isValidISBN10,
  isValidISBN13,
} from '../../common/utils/validators';

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
  const [alertData, setAlertData] = useState({
    severity: 'info',
    message: 'Please fill the form OR scan code',
  });

  const [bookData, setBookData] = useState(formInitialData);
  const [numberOfCopies, setNumberOfCopies] = useState('');
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

  const updateBookData = (partialData) => {
    setBookData({ ...bookData, ...partialData });
  };

  const updateAuthors = (e) => {
    setBookData({ ...bookData, authors: e.target.value.split(',') });
  };

  const processISBN = (isbn) => {
    setAlertData({ severity: 'info', message: 'Fetching book data...' });
    fetchBookInfo(isbn)
      .then((bookData) => {
        setBookData({ ...formInitialData, ...bookData });
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
      copies: numberOfCopies,
    })
      .then(() => {
        setAlertData({
          severity: 'success',
          message: 'Yayy! Book added to library.',
        });
        setBookData(formInitialData);
        setNumberOfCopies('');
      })
      .catch(handleError);
  };

  const isFormDataValid = () => {
    if (isEmpty(bookData.title)) return false;
    if (!(isValidISBN10(bookData.isbn10) || isValidISBN13(bookData.isbn13))) {
      return false;
    }

    if (numberOfCopies < 1) return false;

    return true;
  };

  const shouldSubmit = isFormDataValid();

  return (
    <>
      <AppHeader />
      <Box flexGrow={1} display="flex" flexDirection="column">
        <Typography variant="h6" ml={2} mt={2}>
          Add Book
        </Typography>
        <Box component="form" autoComplete="off" sx={formContainerStyle}>
          <Alert severity={alertData.severity} sx={{ mb: 2 }}>
            {alertData.message}
          </Alert>
          <ValidatedTextField
            label="Title*"
            value={bookData.title}
            validator={validateBookTitle}
            onChange={(title) => updateBookData({ title })}
            fullWidth
            sx={textFieldStyle}
          />
          <ValidatedTextField
            label="ISBN 10"
            value={bookData.isbn10}
            fullWidth
            sx={textFieldStyle}
            validator={(v) => {
              if (isNotEmpty(bookData.isbn13) && isEmpty(v)) return;
              return validateISBN10(v);
            }}
            onChange={(isbn10) => updateBookData({ isbn10 })}
          />
          <ValidatedTextField
            label="ISBN 13"
            value={bookData.isbn13}
            fullWidth
            sx={textFieldStyle}
            validator={(v) => {
              if (isNotEmpty(bookData.isbn10) && isEmpty(v)) return;
              return validateISBN13(v);
            }}
            onChange={(isbn13) => updateBookData({ isbn13 })}
          />
          <TextField
            label="Authors (comma separated)"
            value={bookData.authors?.join(',')}
            fullWidth
            sx={textFieldStyle}
            onChange={updateAuthors}
          />
          <TextField
            label="Number of copies"
            type="number"
            value={numberOfCopies}
            fullWidth
            inputProps={{ min: 1 }}
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
      <BarcodeScanner
        opened={isScannerOpened}
        onCancel={closeScanner}
        onResult={processISBN}
      />
    </>
  );
};

export default AddBooksBulk;
