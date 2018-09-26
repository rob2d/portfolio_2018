import pure from 'recompose/pure'
import React, { Fragment } from 'react'
import ButtonBase from '@material-ui/core/ButtonBase'
import appHistory from 'tools/appHistory'

function ButtonLink ({ 
    url, 
    containerClass, 
    children, 
    delay=250 
}) {
    let isAbsoluteURL = url.indexOf('://') != -1;

    const onClick = function(){
        
        // provide a small timeout so 
        // that animation can be seen
        
        setTimeout(function(){
            if(!isAbsoluteURL) {
                // if protocol unspecified, 
                // handle with local router
                appHistory.goTo(url) 
            } else {
                // otherwise, change location
                window.open(url, '_newtab');
            } 
        }, delay);
    };

    const title = (
        isAbsoluteURL ? 
            `open ${url} in new tab` : 
            undefined
    );

    return (
        <ButtonBase 
            focusRipple 
            className={ containerClass }
            onClick={ onClick }
            title={ title }
        >{ children }
        </ButtonBase>
    );
}

export default pure(ButtonLink);