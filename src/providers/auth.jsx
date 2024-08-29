import { initializeApp } from 'firebase/app';
import {
  browserPopupRedirectResolver,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { useGlobalContext } from './global_context';

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

const app = setupFirebase();
const auth = getAuth(app);

const UserRoles = {
  READER: 'READER',
  MANAGER: 'MANAGER',
};

class UnauthorizedUser extends Error {}

const createAuth = (baseAuth, authHelperAPIs) => {
  const _ = baseAuth;
  const apis = authHelperAPIs;

  let role = null;
  let isVerified = false;

  const getUser = () => _.currentUser;
  const isAuthenticated = () => getUser() !== null;
  const getToken = async () => await getUser().getIdToken();
  const isAdmin = () => role === UserRoles.MANAGER;

  return {
    getUser,
    isAuthenticated,
    getToken,
    isAdmin,
    getRole: () => role,
    loadState: async () => {
      await _.authStateReady();
    },
    verifyAndInit: async () => {
      if (!isAuthenticated()) throw new UnauthorizedUser();
      if (isVerified) return;

      const token = await getToken();
      await apis.verifyAuth(token);
      role = await apis.getUserRole(token);
      isVerified = true;
    },
    login: async () => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      return signInWithPopup(baseAuth, provider, browserPopupRedirectResolver);
    },
    logout: async () => {
      await _.signOut();
      isVerified = false;
      role = null;
    },
  };
};

const useAuth = () => {
  const { auth } = useGlobalContext();
  return auth;
};

export { useAuth, auth, createAuth };
