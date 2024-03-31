
import {CREATE_GROUP_LOADING, CREATE_GROUP_SUCCESS, GETCHATS_LOADING,GETCHATS_SUCCESS, GET_ALL_MESSAGES_LOADING, GET_ALL_MESSAGES_SUCCESS, GetChatsActionTypes} from './chatType'

import {ChatGroup, User} from '../../interfaces/interfaces'

interface currentMessage{
  chat:ChatGroup;
  content:string;
  _id:string;
  readBy:any;
  sender:User;

}
interface allMessages{
  chat:ChatGroup;
  _id:string;
  content:string;
  sender:User;
  readBy:User[];
}
interface AuthState {
    loading: boolean;
    chats: ChatGroup[];
    error: boolean | null;
    currentMessage:currentMessage[];
    allMessages:allMessages[]
  }
  
  const initialState: AuthState = {
    loading: false,
    chats: [],
    error: false,
    currentMessage:[],
    allMessages:[]
  };

  const usersReducer = (state: AuthState = initialState, action: GetChatsActionTypes): AuthState => {
    switch (action.type) {
      case GETCHATS_LOADING:
        return {
          ...state,
          loading: true,
          error: false,
        };
      case GETCHATS_SUCCESS:
        return {
          ...state,
          loading: false,
          chats: action.payload as ChatGroup[],
          error: false,
        };
        case GET_ALL_MESSAGES_LOADING:
          return {
            ...state,
            loading: true,
            error: false,
          };
        case GET_ALL_MESSAGES_SUCCESS:
          return {
            ...state,
            loading: true,
            error: false,
            allMessages:action.payload
          };
          case CREATE_GROUP_LOADING:
            return {
              ...state,
              loading: true,
              error: false,
            };
          case CREATE_GROUP_SUCCESS:
            return {
              ...state,
              loading: false,
              error: false,
          };    
      // case GETUSERS_LOADING:
      //     return {
      //       ...state,
      //       loading: true,
      //       error: false,
      //     };  
      default:
        return state;
    }
  };
  
  
  export default usersReducer;