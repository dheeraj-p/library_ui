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
import BookCover from '../../components/BookCover';

const BookRow = ({ book, index }) => {
  const username = book.borrower.split('@')[0];
  const borrowedDate = new Date(book.borrowed_on + 'Z');
  const title = shorten(book.title, 50);
  const authorText = shorten(book.authors.join(', '), 50);

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar sx={{ mr: 2, alignSelf: 'center' }}>
        <BookCover title={title} author={authorText} index={index} />
      </ListItemAvatar>
      <Stack alignSelf="stretch">
        <ListItemText primary={title} secondary={`by ${authorText}`} />
        <Stack direction="row">
          <Typography variant="caption" whiteSpace="pre">
            {'borrowed by '}
          </Typography>
          <Typography variant="caption" fontWeight={600}>
            {username}
          </Typography>
        </Stack>
        <Typography variant="caption">
          {`${formatToLocale(borrowedDate)} (${getRelativeTimeString(borrowedDate)})`}
        </Typography>
      </Stack>
    </ListItem>
  );
};

const headerStyle = {
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
};

const BorrowedBooks = () => {
  const books = useLoaderData({});
  return (
    <>
      <AppHeader />
      <Stack sx={headerStyle}>
        <Typography variant="h6">Borrowed Books</Typography>
        <Typography variant="caption">{books.length} books</Typography>
      </Stack>
      <List>
        {books.map((book, i) => {
          return <BookRow book={book} key={book.tid} index={i} />;
        })}
      </List>
    </>
  );
};

export default BorrowedBooks;
