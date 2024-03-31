import {
	legacy_createStore as createStore,
	applyMiddleware,
	combineReducers,
} from "redux";
import {thunk} from 'redux-thunk'
import{ type ThunkMiddleware} from "redux-thunk";
import logger from 'redux-logger'
import usersReducer from "./users/getUsersReducer";
import authReducer from "./auth/auth.reducer";
import chatReducer from './chats/chatReducer'
// import venturesReducer from "./venture/venture.reducer";
// import type { AuthActionTypes } from "./authentication/auth.actionTypes";
// import profileReducer from "./profile/profile.reducer";
// import type { VentureActionTypes } from "./venture/venture.actionTypes";
// import jobReducer from "./JobsApi/jobs.reducer";
// import type { JobActionTypes } from "./JobsApi/jobs.actionTypes";
// import singleEventsReducer from "./event/single.event.reducer";
// import pollReducer from "./polls/polls.reducer";
// import type { PollActionTypes } from "./polls/poll.actionTypes";
// import noticeReducer from "./noticeBoard/notice.reducer";
// import type { NoticeActionTypes } from "./noticeBoard/notice.actionTypes";
// import spotlightReducer from "./spotlight/spotlight.reducer";
// import type { EventActionTypes } from "./event/events.actionTypes";
// import type { EventParticipantActionTypes } from "./eventparticipant/eventparticipant.actionTypes";
// import eventsParticipateReducer from "./eventparticipant/eventparticipant.reducer";
// import postReducer from "./posts/post.reducer";
// import { PostActionTypes } from "./posts/post.actiontypes";

// import connectionReducer from "./connections/connection.reducer";
// import type { ConnectionActionTypes } from "./connections/connection.actionTypes";
// import mentorsReducer from "./mentor/mentor.reducer";
// import type { MentorActionTypes } from "./mentor/mentor.actionTypes";
// import { SpotlightActionTypes } from "./spotlight/spotlight.actionTypes";
// import messageReducer from "./messages/message.reducer";
// import { MessageActionTypes } from "./messages/message.actionTypes";
// import { GroupChatActionTypes } from "./groupChat/groupChat.actionTypes";
// import groupChatReducer from "./groupChat/groupChat.reducer";

// import mentorsFeedbackReducer from "./mentor/Feedback/feedback.reducer";
// import { MentorFeedbackActionTypes } from "./mentor/Feedback/feedback.actionTypes";
// import { hofReducer } from "./HallofFame/hof.reducer";
// import { HofActionTypes } from "./HallofFame/hof.actiontypes";
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
	// event: eventsReducer,
	// event_participant: eventsParticipateReducer,
	// single_event: singleEventsReducer,
	// profile: profileReducer,
	// job: jobReducer,
	// venture: venturesReducer,
	// polls: pollReducer,
	// post: postReducer,
	// notices: noticeReducer,
	// spotlight: spotlightReducer,
	// connections: connectionReducer,
	// mentors: mentorsReducer,
	// message:messageReducer,
	// chapter:groupChatReducer,
	// HallofFame:hofReducer,
	// feedbacks: mentorsFeedbackReducer,
	

	// Add other reducers if needed
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