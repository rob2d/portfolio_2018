import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import rootReducer from './reducers'
import routeTitleMapper from 'middleware/routeTitleMapper'
import reduxLogger from 'redux-logger'
import appHistory from 'utils/appHistory'
import { routerMiddleware } from 'connected-react-router'

/**
 * sources for our middleware
 */
const middleware = [
    promise,
    thunk,
    routerMiddleware(appHistory),
    routeTitleMapper
];

// redux-logger is not needed in prod

if(process.env.NODE_ENV != 'production') {
    middleware.push(reduxLogger)
}

const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middleware))
);

export default store