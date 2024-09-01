import { Box, Typography } from '@mui/material';
import LoadingGIF from '../assets/loading.gif';

const loadingStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const fullScreenStyle = {
  height: '100svh',
  width: '100svw',
};

const matchParentStyle = {
  height: '100%',
  width: '100%',
};

const LoadingView = ({ fullScreen = false, message }) => {
  const dimens = fullScreen ? fullScreenStyle : matchParentStyle;
  const imgWidth = fullScreen ? 150 : 100;

  return (
    <Box sx={{ ...loadingStyle, ...dimens }}>
      <img src={LoadingGIF} width={imgWidth} />
      <Typography variant="h6" fontWeight={400} color="primary" mt={2}>
        {message ? message : 'Working on it'}
      </Typography>
    </Box>
  );
};

export default LoadingView;
