import { createSlice } from "@reduxjs/toolkit";

//
const storedUser: string | null =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;
const user = !!storedUser ? JSON.parse(storedUser) : null;

interface AsyncState {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}
// interface ActionTypes {
//   payload?:string|null
// }

interface AuthState extends AsyncState {
  user?: any;
}

const initialState: AuthState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  user: user,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    pending: (state: AuthState) => {
      state.isLoading = true;
    },

    registerSuccess: (state: AuthState, action: any) => {
      state.isLoading = false;
      state.isSuccess = action.payload.msg;
    },
    registerFail: (state: AuthState, action: any) => {
      state.isLoading = false;

      state.isError = action.payload.error;
    },
    loginFail: (state: AuthState, action: any) => {
      state.isLoading = false;

      state.isError = action.payload;
    },
    loginSuccess: (state: AuthState, action: any) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = JSON.parse(localStorage.getItem("user") || "{}");
    },
  },
});
export const {
  pending,
  registerFail,
  registerSuccess,
  loginSuccess,
  loginFail,
} = authSlice.actions;
export default authSlice.reducer;
