import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { Scanner } from '@yudiel/react-qr-scanner';

const mainWindowStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  /* 
    In Material UI, some components like FAB, Modals have implicit z-index.
    The highest z-index in MUI is 1500, so below I am setting it to 1600 to
    show the BarcodeScanner on top of everything.
  */
  zIndex: 1600,
  height: '100vh',
  width: '100vw',

  bgcolor: 'rgba(0,0,0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const ScannerControls = ({ onCancel }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bgcolor: 'rgba(0,0,0, 0.7)',
        height: 60,
        display: 'flex',
        zIndex: 10000,
      }}
    >
      <IconButton onClick={onCancel} sx={{ color: 'white' }}>
        <ArrowBack />
      </IconButton>
      <Box flexGrow={1} />
    </Box>
  );
};

const BarcodeScanner = ({ onResult, onError, opened, onCancel }) => {
  if (!opened) return <></>;

  return (
    <Box sx={mainWindowStyles}>
      <ScannerControls onCancel={onCancel} />
      <Box>
        <Scanner
          onScan={(results) => {
            onResult(results[0].rawValue);
          }}
          onError={onError}
          formats={['ean_13', 'qr_code']}
        />
      </Box>
    </Box>
  );
};

export default BarcodeScanner;
