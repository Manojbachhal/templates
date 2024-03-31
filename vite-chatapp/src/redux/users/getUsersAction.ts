import axios from 'axios';
import {GETUSERS_LOADING,GETUSERS_SUCCESS,GETUSERS_ERROR,GETUSERS_DEBOUNCING_LOADING,GETUSERS_DEBOUNCING_SUCCESS,GETUSERS_DEBOUNCING_ERROR, GetUsersActionTypes} from './getUsersTypes'
import type { Dispatch } from "redux";
import {baseUrl} from '../auth/auth.action'
import { getCookie } from "cookies-next";
import type { AxiosResponse } from "axios";



const apiCall = async (url: string,type:string) => {
    try {
      let token = getCookie("Token");
      
      const res: AxiosResponse<any> = await (axios as any)[type](`${url}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      let data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
};

export const getUsers =(endpoint:string) =>
  async (dispatch: Dispatch<GetUsersActionTypes>): Promise<void> => {
    dispatch({ type: GETUSERS_LOADING });
    try {
        let res= await apiCall(`${baseUrl}${endpoint}`,"get")
        console.log(res)
        dispatch({ type: GETUSERS_SUCCESS, payload: res });
  
      } catch (error) {
        
        dispatch({ type: GETUSERS_ERROR });
      }
}

export const getUsersDebouncing = async (endpoint:string) =>
  async (dispatch: Dispatch<GetUsersActionTypes>): Promise<void> => {
    dispatch({ type: GETUSERS_DEBOUNCING_LOADING });
    try {
        let res= await apiCall(`${baseUrl}${endpoint}`,"get")
        console.log(res)
          // return res;
        // dispatch({ type: GETUSERS_DEBOUNCING_SUCCESS, payload: res });
  
      } catch (error) {
        
        // dispatch({ type: GETUSERS_DEBOUNCING_ERROR });
      }
}