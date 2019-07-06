import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import core from './modules/core'
import history from './utils/appHistory'

export default combineReducers({
    core : core.reducer,
    router : connectRouter(history)
});