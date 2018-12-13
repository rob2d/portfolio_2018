import { combineReducers } from 'redux'
import core from './modules/core'

export default combineReducers({
    core   : core.reducer
});
