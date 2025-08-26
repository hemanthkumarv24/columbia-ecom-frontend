import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userID: number | null;
}

const initialState: AuthState = {
  token: sessionStorage.getItem("jwtToken") || null,
  userID: sessionStorage.getItem("userId")
    ? Number(sessionStorage.getItem("userId"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      sessionStorage.setItem("jwtToken", action.payload);
    },
    
    setUserID(state, action: PayloadAction<number>) {
      state.userID = action.payload;
      sessionStorage.setItem('userID', action.payload.toString());
    },

    clearToken(state) {
      state.token = null;
      state.userID = null;
      sessionStorage.removeItem("jwtToken");
      sessionStorage.removeItem("userId");
    },
    
  },
});

export const { setToken, setUserID, clearToken } = authSlice.actions;
export default authSlice.reducer;
