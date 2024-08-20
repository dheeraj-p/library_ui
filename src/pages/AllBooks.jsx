import { useEffect, useState } from 'react';
import useAPI from '../api/client';
import { Virtuoso } from 'react-virtuoso';
import {
  Box,
  Fab,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { Download, ManageAccounts, MenuBook } from '@mui/icons-material';
import AdminOnly from '../components/AdminOnly';
import { useNavigate } from 'react-router-dom';

const Row = ({ book }) => {
  const authorsText = `by ${book.authors.join(', ')}`;
  return (
    <ListItem
      secondaryAction={
        <AdminOnly>
          <IconButton aria-label="download">
            <Download color="primary" />
          </IconButton>
        </AdminOnly>
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
  const navigate = useNavigate();

  useEffect(() => {
    getAllBooks().then(setBooks);
  }, []);

  const openAdminPanel = () => {
    navigate('/manage');
  };

  return (
    <Box display="flex" height="100%" flexDirection="column">
      <Box flexGrow={1}>
        <Virtuoso
          totalCount={books.length}
          itemContent={(index) => <Row book={books[index]} />}
        />
      </Box>
      <AdminOnly>
        <Box alignSelf="flex-end">
          <Fab
            variant="extended"
            color="primary"
            sx={{ mr: 1, mb: 1 }}
            onClick={openAdminPanel}
          >
            <ManageAccounts sx={{ mr: 1 }} />
            Manage
          </Fab>
        </Box>
      </AdminOnly>
    </Box>
  );
};

export default AllBooks;
