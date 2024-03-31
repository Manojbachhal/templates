export const GETCHATS_LOADING = 'GETCHATS_LOADING';
export const GETCHATS_SUCCESS = 'GETCHATS_SUCCESS';
export const GETCHATS_ERROR = 'GETCHATS_ERROR';
export const GET_ALL_MESSAGES_LOADING = 'GET_ALL_MESSAGES_LOADING';
export const GET_ALL_MESSAGES_SUCCESS = 'GET_ALL_MESSAGES_SUCCESS';
export const GET_ALL_MESSAGES_ERROR = 'GET_ALL_MESSAGES_ERROR';
export const SEND_MESSAGES_LOADING = 'SEND_MESSAGES_LOADING';
export const SEND_MESSAGES_SUCCESS = 'SEND_MESSAGES_SUCCESS';
export const SEND_MESSAGES_ERROR = 'SEND_MESSAGES_ERROR';
export const CREATE_GROUP_LOADING = 'CREATE_GROUP_LOADING';
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const CREATE_GROUP_ERROR = 'CREATE_GROUP_ERROR';
// export const GETUSERS_DEBOUNCING_LOADING = 'GETUSERS_DEBOUNCING_LOADING';
// export const GETUSERS_DEBOUNCING_SUCCESS = 'GETUSERS_DEBOUNCING_SUCCESS';
// export const GETUSERS_DEBOUNCING_ERROR = 'GETUSERS_DEBOUNCING_ERROR';

export interface GetChatsActionTypes {
    type: string;
    payload?: any;
}

