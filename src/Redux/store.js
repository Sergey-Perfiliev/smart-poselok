import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./auth-reducer";
import ProfileReducer from "./profile-reducer";
import VillageReducer from "./village-reducer";

// reducers
let reducers = combineReducers({
	auth: AuthReducer,
	profile: ProfileReducer,
	village: VillageReducer,
})

// store with redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

window.__store__ = store
