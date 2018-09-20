import { applyMiddleware } from 'redux'
import { createStore } from 'redux'
import thunk  from 'redux-thunk'
import promise from 'redux-promise-middleware'
import reducer from './reducers'
import localizer from 'middleware/localizer'
import routeTitleMapper from 'middleware/routeTitleMapper'
import logger from 'redux-logger'
import routerMiddleware from 'react-router-redux/middleware'
import appHistory from 'tools/appHistory'

const middleware = process.env.NODE_ENV == 'production' ?
                        applyMiddleware(
                            promise(),
                            thunk,
                            localizer,
                            routeTitleMapper,
                            routerMiddleware(appHistory) //for intercepting navigation actions
                        ) : applyMiddleware(
                            promise(),
                            thunk,
                            logger,
                            localizer,
                            routeTitleMapper,
                            routerMiddleware(appHistory)
                        );

export default createStore(reducer, middleware)