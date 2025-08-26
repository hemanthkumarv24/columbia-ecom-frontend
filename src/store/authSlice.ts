import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  id: number | null;
}

const initialState: AuthState = {
  token: sessionStorage.getItem("jwtToken") || null,
  id: sessionStorage.getItem("userId")
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
    clearToken(state) {
      state.token = null;
      state.id = null;
      sessionStorage.removeItem("jwtToken");
      sessionStorage.removeItem("userId");
    },
    setId(state, action: PayloadAction<number>) {
      state.id = action.payload;
      sessionStorage.setItem("userId", action.payload.toString());
    },
  },
});

export const { setToken, setId, clearToken } = authSlice.actions;
export default authSlice.reducer;
