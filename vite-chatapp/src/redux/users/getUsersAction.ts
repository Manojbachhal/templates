import axios from "axios";
import {
  GETUSERS_LOADING,
  GETUSERS_SUCCESS,
  GETUSERS_ERROR,
  GETUSERS_DEBOUNCING_LOADING,
  GETUSERS_DEBOUNCING_SUCCESS,
  GETUSERS_DEBOUNCING_ERROR,
  GetUsersActionTypes,
} from "./getUsersTypes";
import type { Dispatch } from "redux";
import { baseUrl } from "../auth/auth.action";
import { getCookie } from "cookies-next";
import type { AxiosResponse } from "axios";
import {
  AUTH_ERROR,
  AUTH_LOADING,
  AUTH_SUCCESS,
} from "../auth/auth.actionTypes";
interface FormDataInterface {
  append(name: string, value: string | Blob, fileName?: string): void;
}

const apiCall = async (url: string, type: string) => {
  try {
    let token = getCookie("Token");

    const res: AxiosResponse<any> = await (axios as any)[type](`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers =
  (endpoint: string) =>
  async (dispatch: Dispatch<GetUsersActionTypes>): Promise<void> => {
    dispatch({ type: GETUSERS_LOADING });
    try {
      let res = await apiCall(`${baseUrl}${endpoint}`, "get");
      console.log(res);

      dispatch({ type: GETUSERS_SUCCESS, payload: res });
    } catch (error) {
      dispatch({ type: GETUSERS_ERROR });
    }
  };

export const getUsersDebouncing =
  async (endpoint: string) =>
  async (dispatch: Dispatch<GetUsersActionTypes>): Promise<void> => {
    dispatch({ type: GETUSERS_DEBOUNCING_LOADING });
    try {
      let res = await apiCall(`${baseUrl}${endpoint}`, "get");
      console.log(res);
      // return res;
      // dispatch({ type: GETUSERS_DEBOUNCING_SUCCESS, payload: res });
    } catch (error) {
      // dispatch({ type: GETUSERS_DEBOUNCING_ERROR });
    }
  };

export const editDetails = async (url: string, formData: FormDataInterface) => {
  // async (dispatch: Dispatch<GetUsersActionTypes>): Promise<void> => {
  // dispatch({ type: AUTH_LOADING });
  try {
    let token = getCookie("Token");

    let config = {
      method: "Post",
      maxBodyLength: Infinity,
      url: `${url}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    };
    let res = await axios.request(config);
    // dispatch({ type: AUTH_SUCCESS, payload: res });
  } catch (error) {
    // dispatch({ type: AUTH_ERROR });
  }
};
