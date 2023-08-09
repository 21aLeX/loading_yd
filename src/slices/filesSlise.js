import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  names: [],
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    addFiles: (state, { payload }) => {
      state.names.push(...payload);
    },
  },
});

export const { addFiles } = filesSlice.actions;

export default filesSlice.reducer;
