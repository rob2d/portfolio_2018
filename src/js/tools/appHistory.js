import createBrowserHistory from 'history/createBrowserHistory'
import getUrlParam from './getUrlparam'

let appHistory = createBrowserHistory();

appHistory.goTo = function(url) {
    
    // be sure to maintain the language query param
    // so that we continue to travel/bookmark the 
    // given language we selected
    
    const language = getUrlParam('language');
 
    const search = language && language != 'en' ? `language=${language}` : '';
    appHistory.push({ pathname : url, search });

};

export default appHistory