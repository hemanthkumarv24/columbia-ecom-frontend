import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: sessionStorage.getItem('jwtToken') || null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      sessionStorage.setItem('jwtToken', action.payload);
    },
    clearToken(state) {
      state.token = null;
      sessionStorage.removeItem('jwtToken'); 
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;