import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
  userId: string | null;
  userName?: string | null;
}

const initialState: UserState = {
  token: localStorage.getItem("token") || null,   
  userId: localStorage.getItem("userId") || null,
  userName: localStorage.getItem("userName") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ✅ Save token & userId
    setUserData: (state, action: PayloadAction<{ token: string; userId: string,userName:string }>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName || null;

      // Optional: persist in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("userName", action.payload.userName || "");
    },

    // ✅ Clear user data on logout
    clearUserData: (state) => {
      state.token = null;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
