import { useEffect, useState } from 'react';
import useAPI from '../api/client';
import { Virtuoso } from 'react-virtuoso';
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { Download, MenuBook } from '@mui/icons-material';

const Row = ({ book }) => {
  const authorsText = `by ${book.authors.join(', ')}`;
  return (
    <ListItem
      secondaryAction={
        <IconButton aria-label="download">
          <Download color="primary" />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <MenuBook color="primary" fontSize="large" />
      </ListItemAvatar>
      <ListItemText primary={book.title} secondary={authorsText} />
    </ListItem>
  );
};

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const { getAllBooks } = useAPI();

  useEffect(() => {
    getAllBooks().then(setBooks);
  }, []);

  return (
    <Virtuoso
      totalCount={books.length}
      itemContent={(index) => <Row book={books[index]} />}
    />
  );
};

export default AllBooks;
