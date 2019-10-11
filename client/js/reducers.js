import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from './utils/appHistory';

export default combineReducers({
    router : connectRouter(history)
});
