import { Virtuoso } from 'react-virtuoso';
import useAPI from '../api/client';
import { useEffect, useState } from 'react';
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
import { MenuBook, QrCodeScanner } from '@mui/icons-material';
import { getRelativeTimeString } from '../utils/date';
import BarcodeScanner from '../components/BarcodeScanner';

const containerStyle = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
};

const fabStyle = { mr: 1, mb: 1, position: 'absolute', right: 0, bottom: 0 };

const Row = ({ book }) => {
  const authorsText = `by ${book.authors.join(', ')}`;
  const borrowedDate = new Date(book.borrowed_on + 'Z'); //Appending Z tells Date API to parse in UTC instead of local time.

  return (
    <ListItem>
      <ListItemAvatar>
        <MenuBook color="primary" fontSize="large" />
      </ListItemAvatar>
      <ListItemText
        primary={book.title}
        secondary={authorsText}
        sx={{ flex: 2 }}
      />
      <Box alignSelf="center" textAlign="end" flex={1}>
        <Typography variant="caption">
          {getRelativeTimeString(borrowedDate)}
        </Typography>
      </Box>
    </ListItem>
  );
};

const initialMessage = {
  visible: false,
  content: '',
};

const CurrentlyReading = () => {
  const [books, setBooks] = useState([]);
  const [messageInfo, setMessageInfo] = useState(initialMessage);
  const [isScannerOpened, setScannerOpened] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ opened: false });
  const { fetchCurrentlyReadingBooks, returnBook } = useAPI();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    setMessageInfo({ visible: true, content: 'Looking for your books...' });
    fetchCurrentlyReadingBooks()
      .then((books) => {
        setBooks(books);
        setMessageInfo({ visible: false });
      })
      .catch((_) => {
        setMessageInfo({
          visible: true,
          content: 'Oops! Something went wrong :(',
        });
      });
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
    setSnackbarData({ ...data, opened: true, duration: 1500 });
  };

  const showError = (message) => openSnackbar({ message, severity: 'error' });
  const showInfo = (message) => openSnackbar({ message, severity: 'info' });
  const showSuccess = (message) =>
    openSnackbar({ message, severity: 'success' });

  const processCopyId = (copyId) => {
    showInfo('Processing...');
    returnBook(copyId)
      .then((res) => {
        showSuccess('Book returned, keep reading. :)');
        loadBooks();
      })
      .catch((_) => showError('Oops! Unknown Error'));

    closeScanner();
  };

  return (
    <Box sx={containerStyle}>
      {messageInfo.visible ? (
        <Typography variant="body1">{messageInfo.content}</Typography>
      ) : (
        <>
          <Virtuoso
            style={{ flexGrow: 1 }}
            totalCount={books.length}
            itemContent={(index) => <Row book={books[index]} />}
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
        </>
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
      >
        <Alert severity={snackbarData.severity}>{snackbarData.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default CurrentlyReading;
