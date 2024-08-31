import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import AppHeader from '../../components/AppHeader';
import { useLoaderData } from '@tanstack/react-router';
import { formatToLocale, getRelativeTimeString } from '../../common/utils/date';
import { shorten } from '../../common/utils/general';

const BookRow = ({ book }) => {
  const username = book.borrower.split('@')[0];
  const borrowedDate = new Date(book.borrowed_on + 'Z');
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar sx={{ mr: 2, alignSelf: 'center' }}>
        <img
          width={70}
          height={100}
          style={{ objectFit: 'cover', border: '0.5px solid' }}
        />
      </ListItemAvatar>
      <Stack>
        <ListItemText
          primary={shorten(book.title, 50)}
          secondary={`by ${shorten(book.authors.join(', '), 50)}`}
          sx={{ mb: 2 }}
        />
        <Stack direction="row">
          <Typography
            variant="body2"
            whiteSpace="pre"
            color={'rgba(0, 0, 0, 0.6)'}
          >
            {'borrowed by '}
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {username}
          </Typography>
        </Stack>
        <Typography variant="body2" color={'rgba(0, 0, 0, 0.6)'}>
          {`${formatToLocale(borrowedDate)} (${getRelativeTimeString(borrowedDate)})`}
        </Typography>
      </Stack>
    </ListItem>
  );
};

const BorrowedBooks = () => {
  const books = useLoaderData({});
  return (
    <>
      <AppHeader />
      <Stack
        sx={{
          pr: 2,
          pt: 2,
          pl: 2,
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexDirection: 'row',
          position: 'sticky',
          top: 50, // TODO: DON'T Hard code
          background: 'white',
          zIndex: 1,
        }}
      >
        <Typography variant="h6">Borrowed Books</Typography>
        <Typography variant="caption">{books.length} books</Typography>
      </Stack>
      <List>
        {books.map((book) => {
          return <BookRow book={book} key={book.tid} />;
        })}
      </List>
    </>
  );
};

export default BorrowedBooks;
