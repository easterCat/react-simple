/**
 * Created by easterCat on 2017/10/16.
 */
import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux-immutable';
import freeze from "redux-freeze"
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {Map} from 'immutable';
import reducers from './reducers';

let middlewares = [];
middlewares.push(thunk);

if (process.env.NODE_ENV !== 'production') {
    // middlewares.push(logger);
    middlewares.push(freeze);
}

//添加中间件
let middleware = applyMiddleware(...middlewares);
//添加redux dev tools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
    middleware = compose(middleware, window.devToolsExtension());
}


const reducer = combineReducers(reducers);

const store = createStore(
    reducer,
    Map({}),
    middleware
);

export default store;