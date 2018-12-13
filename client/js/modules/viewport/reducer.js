import { orderedBreakpoints } from 'constants/style/Breakpoints'
import { REFRESH_WINDOW_DIMENSIONS } from './viewportActions'

// getViewportWidth & getViewportHeight was
// adapted from http://stackoverflow.com/a/8876069/1291659

function getViewportWidth () {
    return Math.max(
        window.document.documentElement.clientWidth, 
        window.innerWidth || 0
    );
}

function getViewportHeight () {
    return Math.max(
        window.document.documentElement.clientHeight, 
        window.innerHeight || 0
    );
}

/**
 * Get the minimum width breakpoint
 * based on a given viewportWidth
 * 
 * @param {Number} viewportWidth 
 */
function getBreakpoint (viewportWidth) {
    for(let bp of orderedBreakpoints) {
        let isMatch = window.matchMedia( `(min-width: ${bp}px)` ).matches;
        if(isMatch) { 
            return bp;
        }
    }
}

const getInitialState = ()=> {
    const viewportWidth = getViewportWidth();

    return {
        viewportWidth,
        viewportHeight : getViewportHeight(),   
        breakpoint : getBreakpoint(viewportWidth)
    };
};

const reducer = (state = { ...getInitialState() }, action) => {
    let { type, payload } = action;
    
    switch(type) {

        case REFRESH_WINDOW_DIMENSIONS :

            let viewportWidth = getViewportWidth(),
                viewportHeight = getViewportHeight(),
                breakpoint = getBreakpoint(viewportWidth);

            if((state.viewportWidth != viewportWidth) || 
                (state.viewportHeight != viewportHeight)
            ) {
                // override width/height which will refresh app view
                
                return Object.assign(
                    { ...state }, 
                    { 
                        viewportWidth, 
                        viewportHeight,
                        breakpoint
                    }
                );
            }
            else return state; 
        
        default:
            break;
    }

    return state;
};

export default reducer