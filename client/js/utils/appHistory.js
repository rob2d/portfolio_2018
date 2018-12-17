import createBrowserHistory from 'history/createBrowserHistory'
let appHistory = createBrowserHistory();

appHistory.goTo = function(url, e) {
    
    // extract actual event from React API
    
    const event = e.nativeEvent;
    const isAbsoluteUrl = (
        (url.indexOf('https://') != -1) ||
        (url.indexOf('http://') != -1) ||
        (url.indexOf('mailto:') != -1)
    );

    // normal left click/touch behavior;

    if(!event.defaultPrevented && 
      !(event.button == 1 || event.button == 2 || 
       event.metaKey || event.ctrlKey)
    ) {
        // push to app history for in-app routing

        if(!isAbsoluteUrl) {
            appHistory.push({ pathname : url });
        } 
        // open in new tab 
        
        else {
            window.open(url, '_blank');
        }
    } 

    // if we discover that it was a middle click 
    // (or special click), simply open URL in new 
    // tab and do not push to history

    else if((event.button == 1 || event.ctrlKey)){
        window.open(url, '_blank'); 
    }
};

export default appHistory