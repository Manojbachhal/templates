export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const ROUTE_LOADING = 'ROUTE_ERROR';
export const CHANGE_PIC = 'CHANGE_PIC';

export interface AuthActionTypes {
  type: string;
  payload?: any;
}
export interface UserData {
  success: boolean
  message: string,
  user: User,
  token:string,
}


export interface User {
  _id: string;
  id: number;
  name: string;
  email: string;
  isAdmin:string;
  pic: string;
  resetToken: null | string;
  resetTokenExpiration: null | string;
  socket_id: null | string;
  current_chat_info: {
    type: string;
    current_chat_id: number;
  };
  isOnline: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface Token {
  token:string
}