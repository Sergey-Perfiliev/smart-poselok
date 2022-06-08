import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./auth-reducer";
import NotificationReducer from "./notification-reducer";
import ProfileReducer from "./profile-reducer";
import UsersReducer from "./users-reducer";
import VillageReducer from "./village-reducer";
import VoteReducer from "./vote-reducer";

// reducers
let reducers = combineReducers({
	auth: AuthReducer,
	profile: ProfileReducer,
	village: VillageReducer,
	notification: NotificationReducer,
	vote: VoteReducer,
	users: UsersReducer,
})

// store with redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

window.__store__ = store
