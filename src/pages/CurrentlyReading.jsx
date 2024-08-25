import { Virtuoso } from 'react-virtuoso';
import useAPI from '../api/client';
import { useEffect, useState } from 'react';
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { MenuBook } from '@mui/icons-material';
import { getRelativeTimeString } from '../utils/date';

const containerStyle = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

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
  const { fetchCurrentlyReadingBooks } = useAPI();

  useEffect(() => {
    setMessageInfo({ visible: true, content: 'Looking for your books...' });
    fetchCurrentlyReadingBooks()
      .then((books) => {
        setBooks(books);
      })
      .catch((_) => {
        setMessageInfo({
          visible: true,
          content: 'Oops! Something went wrong :(',
        });
      });
  }, []);

  return (
    <Box sx={containerStyle}>
      {messageInfo.visible ? (
        <Typography variant="body1">{messageInfo.content}</Typography>
      ) : (
        <Virtuoso
          style={{ flexGrow: 1 }}
          totalCount={books.length}
          itemContent={(index) => <Row book={books[index]} />}
          components={{
            EmptyPlaceholder: () => {
              return (
                <Typography variant="body1">
                  You are not reading any book at the moment
                </Typography>
              );
            },
          }}
        />
      )}
    </Box>
  );
};

export default CurrentlyReading;
