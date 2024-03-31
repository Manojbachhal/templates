// import {GETUSERS_LOADING,GETUSERS_SUCCESS,GETUSERS_ERROR, GetUsersActionTypes} from './getUsersTypes'
import {GETUSERS_LOADING,GETUSERS_SUCCESS,GETUSERS_ERROR,GETUSERS_DEBOUNCING_LOADING,GETUSERS_DEBOUNCING_SUCCESS,GETUSERS_DEBOUNCING_ERROR, GetUsersActionTypes} from './getUsersTypes'

import {User} from '../../interfaces/interfaces'
interface AuthState {
    loading: boolean;
    users: User[];
    usersearch:User[];
    error: boolean | null;
  }
  
  const initialState: AuthState = {
    loading: false,
    users: [],
    usersearch:[],
    error: false,
  };

  const usersReducer = (state: AuthState = initialState, action: GetUsersActionTypes): AuthState => {
    switch (action.type) {
      case GETUSERS_LOADING:
        return {
          ...state,
          loading: true,
          error: false,
        };
      case GETUSERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.payload as User[],
          error: false,
        };
      case GETUSERS_DEBOUNCING_SUCCESS:
        return {
          ...state,
          usersearch: action.payload as User[],
          loading: false,
          error: true,
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