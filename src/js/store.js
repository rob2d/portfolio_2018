import { applyMiddleware } from 'redux'
import { createStore } from 'redux'
import thunk  from 'redux-thunk'
import promise from 'redux-promise-middleware'
import rootReducer from './reducers'
import routeTitleMapper from 'middleware/routeTitleMapper'
import reduxLogger from 'redux-logger'
import appHistory from 'tools/appHistory'
import { 
    connectRouter, 
    routerMiddleware 
} from 'connected-react-router'

/**
 * sources for our middleware
 */
const middleware = [
    promise(),
    thunk,
    routerMiddleware(appHistory),
    routeTitleMapper
];

// redux-logger is not needed in prod

if(process.NODE_ENV == 'production') {
    middleware.push(reduxLogger)
}

/**
 * new root reducer with router state
 */
let routedReducer = connectRouter(appHistory)(rootReducer);

const store = createStore(
    routedReducer, 
    applyMiddleware(...middleware)
);

export default store