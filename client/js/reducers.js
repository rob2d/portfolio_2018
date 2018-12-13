import { combineReducers } from 'redux'
import core from './modules/core'
import viewport from './modules/viewport'

export default combineReducers({
    core     : core.reducer,
    viewport : viewport.reducer
});
