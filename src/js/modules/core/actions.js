import * as t from './actionTypes'
import appHistory from 'tools/appHistory'

export const setLanguage = (language)=> (dispatch, getState)=>
{
    const state = getState();
    if(language != state.core.language) {
        /*

        // TODO : normalize language query location logics
        const pathname = getState().router.location.pathname;
        if(language != 'en') {
            appHistory.goTo(pathname+'?language='+language);
        } else {
            appHistory.goTo(pathname); //en is default and requires no param
        }
        */

        // still, lets be sure to update our store
        // so that middleware can intercept the request
        // and track it as React-Router does not
        // leverage query params
        dispatch({
            type    : t.SET_LANGUAGE,
            payload : { language }
        });
    }
};

export const refreshWindowDimensions = ()=>
({
    type : t.REFRESH_WINDOW_DIMENSIONS,
    payload : {}
});