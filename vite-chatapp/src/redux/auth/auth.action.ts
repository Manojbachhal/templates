import type { Dispatch } from "redux";
import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
export const baseUrl: string | undefined = import.meta.env.VITE_BASE_URL || import.meta.env.VITE_BASE_URI;

import type {
  AuthActionTypes,
  Credentials,
  Token,
  UserData,
} from "./auth.actionTypes";
import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_ERROR,
  ROUTE_LOADING,
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
        credentials,
      );

      const expirationTime = new Date();
      expirationTime.setDate(expirationTime.getDate() + 2); 
      
      setCookie('Token', res.data.token, {
        expires: expirationTime,   
      });
      
      setCookie('isLogin', true, {
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

// export const getUser =
//   (token: string) =>
//   async (dispatch: Dispatch<AuthActionTypes>): Promise<void> => {
//     dispatch({ type: ROUTE_LOADING });

//     try {
//       const res: AxiosResponse<UserData> = await axios.get<UserData>(
//         ${baseUrl}/users/me,
//         {
//           headers: {
//             Authorization: Bearer ${token},
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       dispatch({ type: AUTH_SUCCESS, payload: res.data.user });
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         const axiosError: AxiosError = error;
//         dispatch({ type: AUTH_ERROR, payload: axiosError });
//       }
//     }
//   };

// export const logOutUser = () => async (dispatch: Dispatch<AuthActionTypes>) => {
//   dispatch({ type: AUTH_LOADING });

//   deleteCookie("userToken");

//   dispatch({ type: AUTH_SUCCESS, payload: null });

//   return { message: "Logged out successfully" };
// };

