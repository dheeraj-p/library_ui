import { AutoStories, LibraryBooks, ListAlt } from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from '@mui/material';
import { useState } from 'react';
import AllBooks from '../pages/AllBooks';
import CurrentlyReading from '../pages/CurrentlyReading';

const pages = {
  'all-books': <AllBooks />,
  reading: <CurrentlyReading />,
  'request-book': <>Upcoming Feature</>,
};

const DashboardContent = () => {
  const [currentPage, setCurrentPage] = useState('all-books');
  return (
    <>
      <Box flexGrow={1}>{pages[currentPage]}</Box>
      <Paper>
        <BottomNavigation
          showLabels
          value={currentPage}
          onChange={(_, newPage) => {
            setCurrentPage(newPage);
          }}
        >
          <BottomNavigationAction
            value="all-books"
            label="Books"
            icon={<LibraryBooks />}
          />
          <BottomNavigationAction
            value="reading"
            label="Reading"
            icon={<AutoStories />}
          />
          <BottomNavigationAction
            value="request-book"
            label="Request"
            icon={<ListAlt />}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default DashboardContent;
