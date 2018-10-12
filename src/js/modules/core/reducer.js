import {
    SET_THEME,
    REFRESH_WINDOW_DIMENSIONS
} from './actions'
import getUrlParam from 'tools/getUrlParam'
import Themes from 'constants/Themes'

// getWindowWidth & getWindowHeight was
// adapted from http://stackoverflow.com/a/8876069/1291659
var getViewportWidth = function() {
    return Math.max(window.document.documentElement.clientWidth, window.innerWidth || 0);
};

var getViewportHeight = function() {
    return Math.max(
        window.document.documentElement.clientHeight, 
        window.innerHeight || 0
    );
};


const initialState = {
    theme          : Themes.LIGHT,
    language       : getUrlParam('language') || 'en',
    viewportWidth  : getViewportWidth(),
    viewportHeight : getViewportHeight()
};

const reducer = ( state = { ...initialState }, action ) => {
    if(!action) {
        return state;
    }
    let { type, payload } = action;
    switch(type) {
        case SET_THEME : 
            return Object.assign(
                { ...state },
                { theme : payload.theme }
            );

        case REFRESH_WINDOW_DIMENSIONS :
            let viewportWidth  = getViewportWidth(),
                viewportHeight = getViewportHeight();

            if(state.viewportWidth != viewportWidth || state.viewportHeight != viewportHeight) {
                // override width/height which will refresh app view
                return Object.assign(
                    { ...state }, 
                    { viewportWidth, viewportHeight }
                );
            }
            else return state;  //otherwise do not mutate
        
        default:
            break;
    }

    return state;
};

export default reducer