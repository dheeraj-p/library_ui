import { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  browserPopupRedirectResolver,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const setupFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDmEv75tWs7nf_1alxQT6S-jNXWNboKyyU',
    authDomain: 'athenaeum-df5db.firebaseapp.com',
    projectId: 'athenaeum-df5db',
    storageBucket: 'athenaeum-df5db.appspot.com',
    messagingSenderId: '240107052511',
    appId: '1:240107052511:web:f2f8b2968563858de5386a',
  };

  return initializeApp(firebaseConfig);
};

const doNothing = () => {};

const AuthContext = createContext(null);

const app = setupFirebase();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthReady, setAuthReady] = useState(false);

  useEffect(() => {
    auth.authStateReady().then(() => setAuthReady(true));
  }, []);

  useEffect(() => {
    return auth.onAuthStateChanged(setUser);
  }, []);

  const signin = ({ onSuccess, onError }) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider, browserPopupRedirectResolver)
      .then(onSuccess ?? doNothing)
      .catch(onError ?? doNothing);
  };

  const logout = (onDone = doNothing) => {
    auth.signOut().then(onDone);
  };

  return (
    <AuthContext.Provider value={{ user, signin, logout, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
export { useAuth };
