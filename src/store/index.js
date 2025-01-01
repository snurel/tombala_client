import { configureStore } from '@reduxjs/toolkit';
import tombalaReducer from './tombalaSlice';
import loginReducer from './loginSlice';
import managerReducer from './managerSlice';

const store = configureStore({
  reducer: {
    tombala: tombalaReducer,
    login: loginReducer,
    manager: managerReducer,
  },
});

export default store;
