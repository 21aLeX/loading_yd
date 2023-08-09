import { createContext } from 'react';

const AuthContext = createContext({
  spiner: null,
  loading: () => { },
  loaded: () => { },
  loadingStop: () => { },
});

export default AuthContext;
