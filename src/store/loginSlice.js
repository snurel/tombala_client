import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'lobby',
  username: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateLogin: (state, action) => {
      state.type = action.payload.type;
    },
    updateUserName: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { updateLogin, updateUserName } = loginSlice.actions;
export default loginSlice.reducer;
