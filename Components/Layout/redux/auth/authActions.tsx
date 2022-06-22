import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { NextRouter } from "next/router";
import { toast } from "react-toastify";

//
import {
  loginFail,
  loginSuccess,
  pending,
  registerFail,
  registerSuccess,
} from "./authSlice";

//
export const register =
  (user: any, router: NextRouter) => async (dispatch: Dispatch) => {
    try {
      dispatch(pending());

      const { data } = await axios.post("/api/user/register", user);
      toast.success(data.msg);
      dispatch(registerSuccess(data));
      if (data.msg) {
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (error: any) {
      toast.error(error.data);
      dispatch(registerFail(error.data));
    }
  };

//
export const login =
  (value: any, router: NextRouter) => async (dispatch: any) => {
    try {
      dispatch(pending());

      const { data } = await axios.post("/api/user/login", value, {
        withCredentials: true,
        headers: { crossDomain: true, "Content-Type": "application/json" },
      });

      toast.success(data.msg);
      window.localStorage.setItem("user", JSON.stringify(data));
      if (data.msg) {
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }

      dispatch(loginSuccess(data));
    } catch (error: any) {
      toast.error(error.response.data.error);
      dispatch(loginFail(error.response.data.error));
    }
  };
