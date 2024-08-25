import { TextField } from '@mui/material';
import { useState } from 'react';
import { isNotEmpty } from '../utils/validators';

const ValidatedTextField = ({ validator, value, onChange, ...restProps }) => {
  const [errorText, setErrorText] = useState('');

  const updateError = (newError) => {
    if (errorText === newError) return;

    setErrorText(newError);
  };

  const validateAndChange = (e) => {
    const newValue = e.target.value;
    const validationError = validator(newValue);

    const newError = isNotEmpty(validationError) ? validationError : '';
    updateError(newError);
    onChange(newValue);
  };

  const shouldShowError = isNotEmpty(errorText);

  return (
    <TextField
      variant="outlined"
      error={shouldShowError}
      helperText={errorText}
      value={value}
      onChange={validateAndChange}
      {...restProps}
    />
  );
};

export default ValidatedTextField;
