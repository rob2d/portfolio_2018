import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import pure        from 'recompose/pure'
import ButtonBase  from '@material-ui/core/ButtonBase'
import Themes      from 'constants/Themes'
import appHistory  from 'tools/appHistory'
import injectSheet from 'react-jss'
import Tooltip   from '@material-ui/core/Tooltip'


const styleSheet = {
    touchRipple : {
        color : ({ theme }) => ((theme == Themes.LIGHT) ? 
            '#000000' : '#FFFFFF'
        )
    },
    tooltip : {
        fontSize : '11pt !important',
        padding  : '4px 8px !important',
        minHeight: '20px !important',
        lineHeight: '20px !important'
    }
};

function ButtonLink ({ 
    url, 
    classes,
    containerClass, 
    children, 
    title=undefined,
    delay=250 
}) {
    let isAbsoluteURL = url.indexOf('://') != -1;

    const onClick = function(){ 
        
        // provide a small timeout so 
        // that animation can be seen
        
        setTimeout(function() {
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

    title = title || (
        isAbsoluteURL ? `${url}` : undefined
    );

    return (
        <Tooltip
            enterDelay={ 600 }
            title={ title }
            classes={{ tooltip : classes.tooltip }}
        >
        <ButtonBase 
            focusRipple 
            className={ containerClass }
            onClick={ onClick }
            TouchRippleProps={{
                classes : { ripple : classes.touchRipple }
            }}
        >{ children }
        </ButtonBase>
        </Tooltip>
    );
}

export default pure(connect(({ core }) => 
    ({ theme : core.theme }))
    (injectSheet(styleSheet)(ButtonLink))
);