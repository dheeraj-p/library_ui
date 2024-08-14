import { useState } from 'react';
import { useZxing } from 'react-zxing';

const Scanner = () => {
  const [result, setResult] = useState('');
  const [isResultAvailable, setResultAvailable] = useState(false);

  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
      setResultAvailable(true);
    },
    onDecodeError(err) {
      if (!isResultAvailable) setResult(err.message);
    },
  });

  return (
    <>
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </>
  );
};

export default Scanner;
