import { useCallback, useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import SpinerContext from '../contexts/SpinerContext';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(window.sessionStorage.getItem('token'));
  const [loggedIn, setLoggedIn] = useState(token !== null);
  const logIn = useCallback((data) => {
    setToken(data.access_token);
    window.sessionStorage.setItem('token', data.access_token);
    setLoggedIn(true);
  }, []);
  const getAuthHeader = useCallback(() => {
    if (token) {
      return { headers: { Authorization: `OAuth ${token}` } };
    }
    return {};
  }, [token]);
  const value = useMemo(() => ({
    loggedIn, logIn, getAuthHeader, token,
  }), [getAuthHeader, logIn, loggedIn, token]);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
const SpinerProvider = ({ children }) => {
  const [spiner, setSpiner] = useState('stop');
  const loading = useCallback(() => {
    const spinner = document.querySelector("[data-id='spinner']");
    setSpiner(true);
    spinner.classList.add('spinner', 'active');
    document.body.style.pointerEvents = 'none';
  }, []);
  const loaded = useCallback(() => {
    const spinner = document.querySelector("[data-id='spinner']");
    setSpiner('loaded');
    spinner.removeAttribute('class');
    document.body.style.pointerEvents = 'auto';
  }, []);
  const loadingStop = useCallback(() => {
    setSpiner('stop');
  }, []);
  const value = useMemo(() => ({
    loading, loaded, loadingStop, spiner,
  }), [loading, loaded, loadingStop, spiner]);
  return (
    <SpinerContext.Provider value={value}>
      {children}
    </SpinerContext.Provider>
  );
};

export { AuthProvider, SpinerProvider };
