import { createContext } from 'react';

const AuthContext = createContext({
  loggedIn: null,
  token: null,
  logIn: () => { },
  logOut: () => { },
  getAuthHeader: () => { },
});

export default AuthContext;
