import {applyMiddleware, combineReducers, createStore} from "redux";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sideBarReducer from "./sideBarReducer";
import navReducers from "./navReducers";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'

 let reducers = combineReducers({
     messagePage: dialogsReducer,
     mainPage :profileReducer,
     sideBar: sideBarReducer,
     nav: navReducers,
     usersPage: usersReducer,
     auth: authReducer,
     form: formReducer,
 })

let store = createStore(reducers, applyMiddleware(thunkMiddleware))
window.store = store

export default store;