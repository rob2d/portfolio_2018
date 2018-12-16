import createBrowserHistory from 'history/createBrowserHistory'
let appHistory = createBrowserHistory();

appHistory.goTo = function(url, e) {
    // extract actual event from React API
    const event = e.nativeEvent;

    console.log('event ->', event);

    if(!event.defaultPrevented && 
      // Don't break middle-click or (meta|ctrl)+click (new tab)
      !(event.button == 1 || event.button == 2 || event.metaKey || event.ctrlKey)
    ) {
        appHistory.push({ pathname : url });
    } 

    // if we discover that it was a middle click (or special click),
    //  simply open URL in new tab
    // and do not mess with router
    else if(event.button == 1 || event.ctrlKey){
        window.open(url, '_blank'); 
    }
};

export default appHistory