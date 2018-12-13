import appHistory from 'utils/appHistory'

export const SET_THEME = 'core/SET_THEME';

export const setTheme = (theme) => (dispatch, getState) => {
    if(theme != getState().core.theme) {
        dispatch({ type : SET_THEME, payload : { theme } });
    }
}

export default {
    setTheme,
    SET_THEME
}