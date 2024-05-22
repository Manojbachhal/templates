import type { Dispatch } from "redux";
import type {  AxiosResponse } from "axios";
import axios from "axios";
export const baseUrl: string | undefined =
  import.meta.env.VITE_BASE_URL || import.meta.env.VITE_BASE_URI;

import type {
  AuthActionTypes,
  Credentials,
  UserData,
} from "./auth.actionTypes";
import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_SIGNOUT,
} from "./auth.actionTypes";

import { setCookie, deleteCookie } from "cookies-next";
export const authenticateUser =
  (
    credentials: Credentials,
    handleResponse: (message: string, success: boolean) => void
  ) =>
  async (dispatch: Dispatch<AuthActionTypes>): Promise<void> => {
    dispatch({ type: AUTH_LOADING });
    try {
      const res: AxiosResponse<UserData> = await axios.post(
        `${baseUrl}/users/login`,
        credentials
      );

      const expirationTime = new Date();
      expirationTime.setDate(expirationTime.getDate() + 2);

      setCookie("Token", res.data.token, {
        expires: expirationTime,
      });

      setCookie("isLogin", true, {
        expires: expirationTime,
      });

      // calling reducer
      dispatch({ type: AUTH_SUCCESS, payload: res.data.user });
      handleResponse("Sign in successful!", false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          handleResponse(String(error.response.data.message), true);
        } else {
          handleResponse("something went wrong", true);
        }
      } else {
        handleResponse("something went wrong", true);
      }
      dispatch({ type: AUTH_ERROR });
    }
  };

export const signOut =
  () =>
  async (dispatch: Dispatch<AuthActionTypes>): Promise<void> => {
    try {
      dispatch({ type: AUTH_SIGNOUT, undefined });
      deleteCookie("isLogin");
      deleteCookie("Token");
    } catch (error) {}
  };

