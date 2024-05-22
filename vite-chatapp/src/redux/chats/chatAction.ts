import axios from "axios";

import { baseUrl } from "../auth/auth.action";
import { getCookie } from "cookies-next";
import type { AxiosResponse } from "axios";

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
  try {
    let res = await apiCall(`${baseUrl}${endpoint}`, "get", null);
    return res;
  } catch (error) {
  }
};

// CREATE GROUP CHAT
export const createGroup = async (groupname: string, users: string) => {
  try {
    const data = JSON.stringify({
      name: groupname,
      users: users,
    });
    let api = `${baseUrl}/api/group`;

    let res = await ApiCall(api, data, "post");
    return res;
  } catch (error) {
  }
};

// sending a message
export const sendMessages = async (
  endpoint: string,
  content: string,
  chatId: string
) => {
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
  try {
    const data = "";
    let api = `${baseUrl}${endpoint}/${chatId}`;

    let res = await ApiCall(api, data, "get");
    return res.data;
  } catch (error) {
  }
};
