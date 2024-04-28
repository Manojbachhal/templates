import {
	legacy_createStore as createStore,
	applyMiddleware,
	combineReducers,
} from "redux";
import {thunk} from 'redux-thunk'
import{ type ThunkMiddleware} from "redux-thunk";
// import logger from 'redux-logger'
import logger from 'redux-logger'
import usersReducer from "./users/getUsersReducer";
import authReducer from "./auth/auth.reducer";
import chatReducer from './chats/chatReducer'

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

 
interface PersistConfig{
	key: string,
	storage:any
 }

const authPersistConfig: PersistConfig = {
  key: "auth",
  storage: storage,
};

const userPersistConfig: PersistConfig = {
	key: "user",
	storage: storage,
};

const chatsPersistConfig: PersistConfig = {
	key: "allchats",
	storage: storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUsersReducer = persistReducer(userPersistConfig, usersReducer);
const persistedChatsReducer = persistReducer(chatsPersistConfig, chatReducer);


const rootReducer = combineReducers({
	auth: persistedAuthReducer,
	user:persistedUsersReducer,
	chats:persistedChatsReducer,
	
});




// Define the root state type
export type RootState = ReturnType<typeof rootReducer>;

// Define the type for the thunk middleware
type AppThunk<ReturnType = void> = ThunkMiddleware<
	ReturnType
	// | AuthActionTypes
	// | JobActionTypes
	// | SpotlightActionTypes
	// | VentureActionTypes
	// | PollActionTypes
	// | NoticeActionTypes
	// | PostActionTypes
	// | EventActionTypes
	// | EventParticipantActionTypes
	// | ConnectionActionTypes
	// | MentorActionTypes
	// | MessageActionTypes
	// | GroupChatActionTypes
	// | MentorFeedbackActionTypes
	// | HofActionTypes
>;


export const store = createStore(rootReducer, applyMiddleware<AppThunk>(thunk,logger));
export const persistor = persistStore(store);
// Create store and apply middleware
// export const store = createStore(rootReducer, applyMiddleware<AppThunk>(thunk));

// Define the type for the Redux store's dispatch function
export type AppDispatch = typeof store.dispatch;