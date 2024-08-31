import { Box, Button, IconButton, Link, Typography } from '@mui/material';
import { Link as RouterLink } from '@tanstack/react-router';
import ErrorBookIcon from '../assets/ErrorBookIcon';
import { RefreshOutlined } from '@mui/icons-material';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
};

const ErrorPlaceHolder = () => {
  return (
    <Box sx={containerStyle}>
      <ErrorBookIcon color="error" sx={{ fontSize: 80 }} />
      <Typography variant="h6" fontWeight={400} color="error" mt={2}>
        Oops! Something went wrong.
      </Typography>
      <Button
        startIcon={<RefreshOutlined />}
        sx={{ textTransform: 'none' }}
        LinkComponent={RouterLink}
        to="."
      >
        Refresh
      </Button>
    </Box>
  );
};

export default ErrorPlaceHolder;
