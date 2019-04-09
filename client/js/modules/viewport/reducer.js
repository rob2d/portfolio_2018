import { orderedBreakpoints } from 'constants/style/Breakpoints'
import { REFRESH_WINDOW_DIMENSIONS } from './actions'

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
 * based on a given vpW
 * 
 * @param {Number} vpW 
 */
function getBreakpoint (vpW) {
    for(let bp of orderedBreakpoints) {
        let isMatch = window.matchMedia( `(min-width: ${bp}px)` ).matches;
        if(isMatch) { 
            return bp;
        }
    }
}

const getInitialState = ()=> {
    const vpW = getViewportWidth();

    return {
        vpW,
        vpH : getViewportHeight(),   
        breakpoint : getBreakpoint(vpW)
    };
};

const reducer = (state = { ...getInitialState() }, action) => {
    let { type, payload } = action;
    
    switch(type) {

        case REFRESH_WINDOW_DIMENSIONS :

            let vpW = getViewportWidth(),
                vpH = getViewportHeight(),
                breakpoint = getBreakpoint(vpW);

            if((state.vpW != vpW) || 
                (state.vpH != vpH)
            ) {
                // override width/height which will refresh app view
                
                return Object.assign(
                    { ...state }, 
                    { 
                        vpW, 
                        vpH,
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