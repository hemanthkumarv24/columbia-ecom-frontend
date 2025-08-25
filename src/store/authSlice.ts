import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;  
  userID: string | null;

}

const initialState: AuthState = {
  token: sessionStorage.getItem('jwtToken') || null,
  userID: sessionStorage.getItem('userID') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      sessionStorage.setItem('jwtToken', action.payload);
    },
    
    setUserID(state, action: PayloadAction<string>) {
      state.userID = action.payload;
      sessionStorage.setItem('userID', action.payload);
    },

    clearToken(state) {
      state.token = null;
      state.userID = null;
      sessionStorage.removeItem('jwtToken');
      sessionStorage.removeItem('userID');
    },
  },
});

export const { setToken, clearToken , setUserID} = authSlice.actions;
export default authSlice.reducer;