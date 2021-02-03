import { combineReducers } from "redux";
import auth from "./reducer/auth";
import alerts from "./reducer/alerts";
import posts from "./reducer/posts";
import profiles from "./reducer/profiles";
import wall from "./reducer/wall";
export default combineReducers({ auth, alerts, posts, profiles, wall });
