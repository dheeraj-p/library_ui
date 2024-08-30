import { Box, Typography } from '@mui/material';
import LoadingGIF from '../assets/loading.gif';

const loadingStyle = {
  height: '100svh',
  width: '100svw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const LoadingPage = () => {
  return (
    <Box sx={loadingStyle}>
      <img src={LoadingGIF} width={150} />
      <Typography variant="h6" color="primary" mt={2}>
        Working on it
      </Typography>
    </Box>
  );
};

export default LoadingPage;
