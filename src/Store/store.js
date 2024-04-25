import { createStore, combineReducers } from "redux";
import shopReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

// Combine the reducers
const rootReducer = combineReducers({
  shop: shopReducer,
  
});


const store = createStore(rootReducer, composeWithDevTools());

export default store;