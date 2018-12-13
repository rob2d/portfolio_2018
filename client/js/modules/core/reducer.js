import { SET_THEME } from './actions'
import Themes from 'constants/Themes'

const initialState = {
    theme : Themes.LIGHT
};

const reducer = ( state = { ...initialState }, action ) => {
    if(!action) {
        return state;
    }

    let { type, payload } = action;

    switch(type) {
        case SET_THEME : 
            return Object.assign(
                { ...state }, { theme : payload.theme }
            );

        default:
            break;
    }

    return state;
};

export default reducer