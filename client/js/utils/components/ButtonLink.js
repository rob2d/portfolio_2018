import React, { Fragment } from 'react'
import ButtonBase  from '@material-ui/core/ButtonBase'
import { makeStyles } from '@material-ui/styles'
import Themes      from 'constants/Themes'
import appHistory  from 'utils/appHistory'
import Tooltip   from '@material-ui/core/Tooltip'

const useStyles = makeStyles( theme => ({
    touchRipple : {
        color : () => (theme.theme == Themes.LIGHT ? 
            '#000000' : '#FFFFFF'
        )
    },
    tooltip : {
        fontSize : '11pt',
        padding  : '4px 8px',
        minHeight: '20px',
        lineHeight: '20px'
    }
}));

function ButtonLink ({ 
    url, containerClass, children, 
    title=undefined, delay=250 
}) {
    const classes = useStyles();
    let isAbsoluteURL = url.indexOf('://') != -1;

    const onClick = e => { 
        e.persist();

        // provide a small timeout so 
        // that animation can be seen
        
        setTimeout(()=> appHistory.goTo(url, e), delay);
    };

    title = title || (isAbsoluteURL?`${url}`:undefined);

    const ButtonContent = (
        <ButtonBase 
                focusRipple 
                className={ containerClass }
                onMouseDown={ onClick }
                TouchRippleProps={{
                    classes : { ripple : classes.touchRipple }
                }}
            >{ children }
            </ButtonBase>
    );

    if(title && title.length) {
        return (
            <Tooltip
                enterDelay={ 600 }
                title={ title }
                classes={{ tooltip : classes.tooltip }}
            >
            { ButtonContent }
            </Tooltip>
        );
    } 
    else return ButtonContent;
}

export default ButtonLink