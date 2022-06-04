import { createStore } from "redux";
import reducer from "../reducers/index";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

// const middlewares = [];

export const store = createStore(reducer, applyMiddleware(thunk, logger));
