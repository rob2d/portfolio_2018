import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import pure        from 'recompose/pure'
import ButtonBase  from '@material-ui/core/ButtonBase'
import Themes      from 'constants/Themes'
import appHistory  from 'tools/appHistory'
import injectSheet from 'react-jss'

const styleSheet = {
    touchRipple : {
        color : ({ theme }) => ((theme == Themes.LIGHT) ? 
            '#000000' : '#FFFFFF'
        )
    }
};

function ButtonLink ({ 
    url, 
    classes,
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
            TouchRippleProps={{
                classes : {
                    ripple : classes.touchRipple
                }
            }}
        >{ children }
        </ButtonBase>
    );
}

export default pure(connect(({ core }) => 
    ({ theme : core.theme }))
    (injectSheet(styleSheet)(ButtonLink))
);