import { Box, Stack, Typography, useTheme } from '@mui/material';
import { shorten } from '../common/utils/general';

const backgrounds = [
  '#7A6F9B',
  '#19323C',
  '#1F487E',
  '#50514F',
  '#8C1C13',
  '#08415C',
  '#432E36',
  '#47624F',
  '#AB5E0D',
  '#594F3B',
  '#776258',
];

const textStyle = {
  fontSize: 10,
  textAlign: 'center',
  color: '#ffffff',
  textShadow: '2px 2px 2px grey',
};

const authorTextStyle = {
  ...textStyle,
  position: 'absolute',
  bottom: 0,
  width: '100%',
  background: 'black',
  borderRadius: '0px 0px 6px 0px',
};

const borderRadius = '0px 6px 6px 0px';

const BookCover = ({ title, author, index }) => {
  const bgColor = backgrounds[index % backgrounds.length];
  return (
    <Box position="relative">
      <Typography sx={authorTextStyle}>{shorten(author, 15, '...')}</Typography>
      <Stack
        direction="row"
        width={90}
        height={120}
        sx={{ boxShadow: `3px 3px 6px ${bgColor}` }}
        borderRadius={borderRadius}
      >
        <Box width="20%" bgcolor="#272635" borderRight="1px dotted white" />
        <Stack
          width="80%"
          bgcolor={bgColor}
          border="0.5px solid"
          borderRadius={borderRadius}
          justifyContent="center"
          alignItems="center"
          p={1}
        >
          <Typography sx={textStyle}>{shorten(title, 30, '...')}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BookCover;
