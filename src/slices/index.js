import { configureStore } from '@reduxjs/toolkit';
import files from './filesSlise.js';

export default configureStore({
  reducer: {
    files,
  },
});
