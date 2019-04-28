import { combineReducers } from 'redux'
import core from './modules/core'
import viewport from './modules/viewport'
import { connectRouter } from 'connected-react-router'
import history from './utils/appHistory'

export default combineReducers({
    core     : core.reducer,
    viewport : viewport.reducer,
    router : connectRouter(history)
});
