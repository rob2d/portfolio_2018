import createBrowserHistory from 'history/createBrowserHistory'
import getUrlParam from './getUrlparam'

let appHistory = createBrowserHistory();

appHistory.goTo = function(url)
{
    // be sure to maintain the language query param
    // so that we continue to travel/bookmark the 
    // given language we selected

    const language = getUrlParam('language') || 'en';
    if((language && language == 'en') || !language) {
        appHistory.replace(url);
    } else {
        appHistory.replace(`${url}?language=${language}`);
    }
};

export default appHistory