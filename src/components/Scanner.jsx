import { ArrowBack, Cameraswitch, FlashlightOff } from '@mui/icons-material';
import { Box, Icon, IconButton } from '@mui/material';
import { useZxing } from 'react-zxing';

const focusBoxBorder = '4px solid green';
const focusBoxStyles = {
  container: {
    position: 'relative',
  },
  common: {
    position: 'absolute',
    width: 40,
    height: 40,
    pointerEvents: 'none',
  },
  top: { top: 0, borderTop: focusBoxBorder },
  bottom: { bottom: 0, borderBottom: focusBoxBorder },
  left: { left: 0, borderLeft: focusBoxBorder },
  right: { right: 0, borderRight: focusBoxBorder },
};

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
};

const videoStyles = {
  objectFit: 'cover',
  height: '100%',
  width: '100%',
};

const overlayGridStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  display: 'grid',
  gridTemplateRows: '20% 34% 46%',
  gridTemplateColumns: '10% 80% 10%',
};

const OverlayBox = ({ fullSized }) => {
  return (
    <Box
      bgcolor="rgba(0,0,0, 0.5)"
      gridColumn={fullSized ? '1 / span 3' : null}
    />
  );
};

const FocusBox = () => {
  const { container, common, top, bottom, left, right } = focusBoxStyles;
  return (
    <Box bgcolor="transparent" sx={container}>
      <Box sx={{ ...common, ...top, ...left }} />
      <Box sx={{ ...common, ...top, ...right }} />
      <Box sx={{ ...common, ...bottom, ...left }} />
      <Box sx={{ ...common, ...bottom, ...right }} />
    </Box>
  );
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
      <IconButton sx={{ color: 'white', mr: 1 }}>
        <FlashlightOff />
      </IconButton>
      <IconButton sx={{ color: 'white', mr: 1 }}>
        <Cameraswitch />
      </IconButton>
    </Box>
  );
};

const BarcodeScanner = ({ onResult, onError, opened, onCancel }) => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      if (onResult) onResult(result.getText());
    },
    onDecodeError(err) {
      if (onError) onError(err);
    },
    paused: !opened,
  });

  return (
    <Box sx={mainWindowStyles} display={opened ? 'block' : 'none'}>
      <ScannerControls onCancel={onCancel} />
      <Box sx={overlayGridStyles}>
        <OverlayBox fullSized />
        <OverlayBox />
        <FocusBox />
        <OverlayBox />
        <OverlayBox fullSized />
      </Box>
      <video ref={ref} style={videoStyles} />
    </Box>
  );
};

export default BarcodeScanner;
