import createBrowserHistory from 'history/createBrowserHistory'
import getUrlParam from './getUrlparam'

let appHistory = createBrowserHistory();

appHistory.goTo = function(url)
{
    appHistory.push({ pathname : url });
    /*
    // be sure to maintain the language query param
    // so that we continue to travel/bookmark the 
    // given language we selected
    // TODO : make setLanguage action trigger via middleware
    //        on location change vs this right now.
    //        For the purpose of putting things up,
    //        language query strings are not saved

    const baseUrl = `[
        window.location.protocol, '//', 
        window.location.host, 
        window.location.pathname
    ].join('')`;
    const language = getUrlParam('language') || 'en';
    if((language && language == 'en') || !language) {
        appHistory.push({pathname:url, search :'?language=en'});
    } else {
        appHistory.push({pathname:url, search:`?language=${language}`});
    }
    */
};

export default appHistory