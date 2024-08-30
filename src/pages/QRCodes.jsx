import { memo, useEffect, useRef, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { QrCode } from '@mui/icons-material';
import QRCode from 'qrcode';

import AppHeader from '../components/AppHeader';
import { formatForInput } from '../utils/date';
import useAPI from '../common/api_client';

const qrContainerStyle = {
  width: 200,
  height: 240,
  m: 0,
  mb: 2,
  border: '1px solid',
  display: 'flex',
  justifyContent: 'space-evenly',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
};

const QRItem = ({ copy, index }) => {
  const canvasRef = useRef();
  const { title, copy_id } = copy;
  const titleToRender = title.length > 50 ? `${title.slice(0, 50)}...` : title;

  useEffect(() => {
    (async () => {
      const uri = await QRCode.toDataURL(`${copy_id}||${titleToRender}`);
      canvasRef.current.src = uri;
    })();
  }, []);

  return (
    <Box component="figure" sx={qrContainerStyle}>
      <img ref={canvasRef} style={{ width: 190 }} />
      <Typography component="figcaption" variant="caption" fontWeight="bold">
        {index + 1}: {titleToRender}
      </Typography>
    </Box>
  );
};

const QRItemMemoised = memo(QRItem, (oldCopy, newCopy) => {
  return oldCopy.copy_id === newCopy.copy_id;
});

const QRCodes = () => {
  const today = new Date();
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const [isPrintMode, setPrintMode] = useState(false);
  const [copies, setCopies] = useState([]);
  const { fetchCopies } = useAPI();

  const changeFrom = (e) => setFrom(new Date(e.target.value));
  const changeTo = (e) => setTo(new Date(e.target.value));

  const fetchQRInfo = () => {
    fetchCopies(from.toISOString(), to.toISOString()).then((copies) => {
      setCopies(copies);
      setPrintMode(true);
    });
  };

  return (
    <>
      <AppHeader />
      {!isPrintMode && (
        <>
          <Stack direction="row" justifyContent="space-around" mt={2}>
            <TextField
              type="date"
              label="From"
              value={formatForInput(from)}
              onChange={changeFrom}
            />
            <TextField
              type="date"
              label="To"
              value={formatForInput(to)}
              onChange={changeTo}
            />
          </Stack>
          <Button
            variant="contained"
            sx={{ m: 2, alignSelf: 'stretch' }}
            startIcon={<QrCode />}
            onClick={fetchQRInfo}
          >
            Get Codes
          </Button>
        </>
      )}
      <Box pl={2} pr={2} flexGrow={1} mt={4}>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {copies.map((copy, index) => (
            <QRItemMemoised copy={copy} index={index} />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default QRCodes;
