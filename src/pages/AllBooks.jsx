import { useReducer, useState } from 'react';
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
import { useNavigate } from '@tanstack/react-router';
import BookCover from '../components/BookCover';
import { useBookStore } from '../common/book_store';

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

// Not sure if it's a good idea to track the scroll position using a global variable
let lastScrollPosition = 0;

const LoadingFooter = ({ context: { isLoadingMore } }) => {
  if (isLoadingMore)
    return <Typography textAlign="center">Loading More...</Typography>;

  return <></>;
};

const AllBooks = () => {
  const store = useBookStore();
  const [isScannerOpened, setScannerOpened] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ opened: false });
  const [isLoadingMore, setLoadingMore] = useState(false);

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
          data={store.getBooks()}
          onScroll={(e) => (lastScrollPosition = e.target.scrollTop)}
          initialScrollTop={lastScrollPosition}
          endReached={async () => {
            setLoadingMore(true);

            /* 
              This line doesn't cause a rerender it only loads in memory.
              Fix it to automatically trigger rerender as well
            */
            await store.loadMore();

            /* 
              Below line is doing two things:
              1. It's setting the isLoadingMore to false (Obviously)
              2. It's triggering a rerender (obviously) which as a side effect 
                 also causes component to take latest books from bookStore and
                 the that is how the UI is updated
              If you remove the below line the component won't rerender after loading more books
              and UI won't be updated.
            */
            setLoadingMore(false);
          }}
          context={{ isLoadingMore }}
          components={{ Footer: LoadingFooter }}
          itemContent={(index, book) => {
            return <Row book={book} key={book.id} index={index} />;
          }}
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
