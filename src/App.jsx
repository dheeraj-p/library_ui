import { useEffect } from 'react';
import { useAuth } from './providers/auth';

function App() {
  const { user, signin, logout } = useAuth();

  return (
    <div>
      <button onClick={signin}>Signin with Google</button>
    </div>
  );
}

export default App;
