import combineReducers   from 'redux/lib/combineReducers'
import core              from './modules/core'
import { routerReducer } from 'react-router-redux/reducer'

export default combineReducers(
{
    [core.constants.NAME]              : core.reducer,
    router                             : routerReducer
});
