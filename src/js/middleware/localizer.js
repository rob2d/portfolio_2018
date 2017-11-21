import localizationSetter from 'tools/localizationSetter'
import { SET_LANGUAGE } from 'modules/core/actionTypes'
import { LOCATION_CHANGE } from 'react-router-redux/reducer'
import queryString from 'query-string'

const localizer = store => next => action =>
{
    const state = store.getState();

    // detect language changes via URL params
    if (action.type == LOCATION_CHANGE)
    {
        const stateSearchQuery = state.router && state.router.location && state.router.location.search;
        const prevLanguage = stateSearchQuery && queryString.parse(stateSearchQuery).language || 'en';
        const nextLanguage = (
            action.payload.search && queryString.parse(action.payload.search).language
        ) || 'en';

        if(prevLanguage != nextLanguage) {
            store.dispatch({
                type    : SET_LANGUAGE,
                payload : { language : nextLanguage }
            });
        }
    }


    // dispatch language changes in localization middleware
    // when detecting an explicit language change event
    if(action.type == SET_LANGUAGE) {
        localizationSetter.setLanguage(action.payload.language);
    }
    return next(action);
};

export default localizer