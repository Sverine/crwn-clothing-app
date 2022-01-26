import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

//We decide to put the logger into an array instead of just an object in case we need to add things
const middlewares = [logger];

//This method need the root reducer and middlewares.
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;