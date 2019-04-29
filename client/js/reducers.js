import { combineReducers } from 'redux'
import core from './modules/core'
import { connectRouter } from 'connected-react-router'
import history from './utils/appHistory'

export default combineReducers({
    core     : core.reducer,
    router : connectRouter(history)
});
