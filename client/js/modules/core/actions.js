import appHistory from 'utils/appHistory'

export const SET_THEME    = 'core/SET_THEME';
export const REFRESH_WINDOW_DIMENSIONS = 'core/REFRESH_WINDOW_DIMENSIONS';


export const setTheme = (theme) => (dispatch, getState) => {
    if(theme != getState().core.theme) {
        dispatch({ type : SET_THEME, payload : { theme } });
    }
}

export const refreshWindowDimensions = ()=> ({
    type : REFRESH_WINDOW_DIMENSIONS,
    payload : {}
});

export default {
    refreshWindowDimensions,
    setTheme,
    SET_THEME,
    REFRESH_WINDOW_DIMENSIONS
}