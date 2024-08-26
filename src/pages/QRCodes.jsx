import { forwardRef, memo, useEffect, useRef, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { QrCode } from '@mui/icons-material';
import QRCode from 'qrcode';
import { VirtuosoGrid } from 'react-virtuoso';

import RequireAuth from '../components/RequireAuth';
import UserRoleProvider from '../providers/role';
import AppHeader from '../components/AppHeader';
import { formatForInput } from '../utils/date';
import useAPI from '../api/client';

const QRItem = ({ copy }) => {
  const canvasRef = useRef();

  useEffect(() => {
    (async () => {
      const uri = await QRCode.toDataURL(copy.copy_id);
      canvasRef.current.src = uri;
    })();
  }, []);

  return (
    <Box component="figure" sx={{ width: 200, m: 0, mb: 2 }}>
      <img ref={canvasRef} style={{ border: '1px solid' }} />
      <Typography component="figcaption" variant="caption">
        {copy.title}
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
    <RequireAuth>
      <UserRoleProvider>
        <Box height="100vh" display="flex" flexDirection="column">
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
            <VirtuosoGrid
              totalCount={copies.length}
              components={{
                List: forwardRef(({ style, children, ...props }, ref) => (
                  <div
                    ref={ref}
                    {...props}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                    }}
                  >
                    {children}
                  </div>
                )),
              }}
              itemContent={(index) => <QRItemMemoised copy={copies[index]} />}
            />
          </Box>
        </Box>
      </UserRoleProvider>
    </RequireAuth>
  );
};

export default QRCodes;
