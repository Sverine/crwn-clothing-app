import { createStore, applyMiddleware } from "redux";

//That give us the logs from our state after any actions have been fired
import logger from "redux-logger";
import thunk from 'redux-thunk';

//Used to cache the store
import { persistStore } from 'redux-persist';

import rootReducer from "./root-reducer";

//We decide to put the logger into an array instead of just an object in case we need to add things
//Later on the project, we add thunk, which is from the redux-thunk, to allow to make async dispatch in reducers
const middlewares = [thunk];


//The way to configure things depends on the project's environement
if (process.env.NODE_ENV==='development'){
    middlewares.push(logger)
}

//This method need the root reducer and middlewares.
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//Way to put in cache the store
export const persistor = persistStore(store);
