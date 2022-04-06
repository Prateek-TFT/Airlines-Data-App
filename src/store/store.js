import { combineReducers, createStore } from "redux";
import reducer from "../store/reducer";

const RootReducer = combineReducers({ Reducer: reducer });
const store = createStore(RootReducer);
export default store;
