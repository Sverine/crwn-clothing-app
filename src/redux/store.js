import { createStore, applyMiddleware } from "redux";

//That give us the logs from our state after any actions have been fired
import logger from "redux-logger";

//Used to cache the store
import { persistStore } from 'redux-persist';

import rootReducer from "./root-reducer";

//We decide to put the logger into an array instead of just an object in case we need to add things
const middlewares = [logger];

//This method need the root reducer and middlewares.
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//Way to put in cache the store
export const persistor = persistStore(store);
