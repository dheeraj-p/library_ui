import {
  Box,
  Divider,
  Fab,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import RequireAuth from '../components/RequireAuth';
import UserRoleProvider from '../providers/role';
import AppHeader from '../components/AppHeader';
import { QrCodeScanner, Remove } from '@mui/icons-material';
import { Virtuoso } from 'react-virtuoso';
import { useState } from 'react';
import BarcodeScanner from '../components/BarcodeScanner';

const BookItem = ({ isLastItem, isbn, copies, onRemove }) => {
  const copiesText = copies > 1 ? 'copies' : 'copy';
  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton aria-label="remove" onClick={() => onRemove(isbn)}>
            <Remove color="primary" />
          </IconButton>
        }
      >
        <Typography
          sx={{
            mr: 2,
            fontWeight: 'bold',
          }}
        >
          ISBN
        </Typography>
        <ListItemText primary={`${isbn} (${copies} ${copiesText})`} />
      </ListItem>
      {!isLastItem ? <Divider aria-hidden="true" /> : <></>}
    </>
  );
};

const AddBooksBulk = () => {
  const [isbns, setISBNs] = useState(new Map());
  const [isScannerOpened, setScannerOpened] = useState(false);

  const openScanner = () => setScannerOpened(true);
  const closeScanner = () => {
    setScannerOpened(false);
  };

  const addISBN = (isbn) => {
    setISBNs((isbns) => {
      const count = isbns.get(isbn) ?? 0;
      isbns.set(isbn, count + 1);

      return isbns;
    });

    closeScanner();
  };

  const removeISBN = (isbn) => {
    if (!isbns.has(isbn)) return;

    const isbnsCloned = new Map(isbns);

    const count = isbnsCloned.get(isbn);
    if (count == 1) {
      isbnsCloned.delete(isbn);
      setISBNs(isbnsCloned);
      return;
    }

    isbnsCloned.set(isbn, count - 1);
    setISBNs(isbnsCloned);
  };

  const listItems = isbns.entries().toArray();

  return (
    <RequireAuth>
      <UserRoleProvider>
        <Box flexDirection="column" height="100vh" display="flex">
          <AppHeader />
          <Box flexGrow={1} display="flex" flexDirection="column">
            <Typography variant="h6" ml={2} mt={2}>
              Add Books
            </Typography>
            <Virtuoso
              totalCount={isbns.size}
              itemContent={(index) => {
                const [isbn, copies] = listItems[index];
                const isLastItem = index + 1 == isbns.size;
                return (
                  <BookItem
                    isbn={isbn}
                    copies={copies}
                    isLastItem={isLastItem}
                    onRemove={removeISBN}
                  />
                );
              }}
            />
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
          onResult={addISBN}
        />
      </UserRoleProvider>
    </RequireAuth>
  );
};

export default AddBooksBulk;
