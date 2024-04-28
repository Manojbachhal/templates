import axios from "axios";
import {
  GETCHATS_LOADING,
  GETCHATS_SUCCESS,
  GETCHATS_ERROR,
  GetChatsActionTypes,
  SEND_MESSAGES_LOADING,
  SEND_MESSAGES_SUCCESS,
  SEND_MESSAGES_ERROR,
  GET_ALL_MESSAGES_LOADING,
  GET_ALL_MESSAGES_SUCCESS,
  GET_ALL_MESSAGES_ERROR,
  CREATE_GROUP_LOADING,
  CREATE_GROUP_ERROR,
  CREATE_GROUP_SUCCESS,
} from "./chatType";
import type { Dispatch } from "redux";
import { baseUrl } from "../auth/auth.action";
import { getCookie } from "cookies-next";
import type { AxiosResponse } from "axios";
// import { User } from "../auth/auth.actionTypes";

const ApiCall = async (api: string, data: string, method: string) => {
  let token = getCookie("Token");
  let config = {
    method: `${method}`,
    maxBodyLength: Infinity,
    url: `${api}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  let response = await axios.request(config);
  return response;
  // console.log(JSON.stringify(response.data));
};

const apiCall = async (url: string, type: string, body: any | null) => {
  try {
    let token = getCookie("Token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: body,
    };
    const res: AxiosResponse<any> = await (axios as any)[type](
      `${url}`,
      config
    );
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

// GET CHATS
export const getChats = async (endpoint: string) => {
  // async (dispatch: Dispatch<GetChatsActionTypes>): Promise<void> => {
  // dispatch({ type: GETCHATS_LOADING });
  try {
    let res = await apiCall(`${baseUrl}${endpoint}`, "get", null);
    return res;
    console.log(res);
    // dispatch({ type: GETCHATS_SUCCESS, payload: res });
  } catch (error) {
    // dispatch({ type: GETCHATS_ERROR });
  }
};

// CREATE GROUP CHAT

export const createGroup = async (groupname: string, users: string) => {
  // async (dispatch: Dispatch<GetChatsActionTypes>): Promise<void> => {
  // dispatch({ type: CREATE_GROUP_LOADING });
  try {
    const data = JSON.stringify({
      name: groupname,
      users: users,
    });
    let api = `${baseUrl}/api/group`;

    let res = await ApiCall(api, data, "post");
    return res;
    // console.log(res.data);
    // dispatch({ type: CREATE_GROUP_SUCCESS, payload: res });
  } catch (error) {
    // dispatch({ type: CREATE_GROUP_ERROR });
  }
};

// sending a message

export const sendMessages = async (
  endpoint: string,
  content: string,
  chatId: string
) => {
  // dispatch({ type: SEND_MESSAGES_LOADING });
  try {
    const data = JSON.stringify({
      content,
      chatId,
    });
    let api = `${baseUrl}${endpoint}`;

    let res = await ApiCall(api, data, "post");
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// getting all messages
export const getMessages = async (endpoint: string, chatId: string) => {
  // async (dispatch: Dispatch<GetChatsActionTypes>): Promise<void> => {
  // dispatch({ type: GET_ALL_MESSAGES_LOADING });
  try {
    const data = "";
    let api = `${baseUrl}${endpoint}/${chatId}`;

    let res = await ApiCall(api, data, "get");
    return res.data;
    // console.log(res.data);
    // dispatch({ type: GET_ALL_MESSAGES_SUCCESS, payload: res.data });
  } catch (error) {
    // dispatch({ type: GET_ALL_MESSAGES_ERROR });
  }
};
