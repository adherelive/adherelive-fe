import {applyMiddleware, legacy_createStore} from "redux";
import thunk from "redux-thunk";
import retainState from "./RetainState";
import allReducers from "./modules";
import {composeWithDevTools} from "redux-devtools-extension";

const middleware = [thunk, retainState];

let store;
if (process.env.NODE_ENV === "development") {
    store = legacy_createStore(
        allReducers,
        composeWithDevTools(applyMiddleware(...middleware))
    );
} else {
    store = legacy_createStore(allReducers, applyMiddleware(...middleware));
}

export default store;
