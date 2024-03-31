import type { AuthActionTypes, User } from './auth.actionTypes';
import { AUTH_LOADING, AUTH_SUCCESS, AUTH_ERROR, ROUTE_LOADING, CHANGE_PIC } from './auth.actionTypes';

interface AuthState {
  loading: boolean;
  user: User | null;
  error: boolean | null;
  routeloading: boolean
}

const initialState: AuthState = {
  loading: false,
  user: null,
  routeloading: false,
  error: false,
};

const authReducer = (state: AuthState = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload as User,
        error: false,
        routeloading: false
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        routeloading: false
      };
    case ROUTE_LOADING:
      return {
        ...state,
        routeloading: true
      }
    case CHANGE_PIC:
      return {
        ...state,
        user: { ...state.user, user_profile_photo_path: action.payload } as User
      }
    default:
      return state;
  }
};


export default authReducer;