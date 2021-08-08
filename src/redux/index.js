import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import goodsReducer from "./goodsReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  goods: goodsReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
