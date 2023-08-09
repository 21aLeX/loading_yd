import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './slices/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import getI18 from './i18next.js';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// eslint-disable-next-line no-unused-vars
const i18next = await getI18();
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

// reportWebVitals(console.log);
