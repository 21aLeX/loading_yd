import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom/dist/index.js';
import getYa from '../init.js';
import useAuth from '../hooks/useAuth.jsx';
import { routes } from '../utils/routes.js';

const AuxiliaryPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const simulation = React.useRef(false);
  useEffect(() => {
    const setData = (data) => {
      auth.logIn(data);
      navigate(routes.home());
    };
    if (!simulation.current) {
      simulation.current = true;
      const data = getYa();
      data.then(setData);
    }
  }, []);

  return (
    <div>{t('loginY')}</div>
  );
};

export default AuxiliaryPage;
