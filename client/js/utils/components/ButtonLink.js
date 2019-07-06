import React, { useMemo, useCallback } from 'react'
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
    }
}));

function ButtonLink ({ 
    url, containerClass, children, 
    title=undefined, delay=250 
}) {
    const classes = useStyles();

    let isAbsoluteURL = useMemo(()=> 
        url.indexOf('://') != -1, [url]
    );

    const onClick = useCallback( e => { 
        e.persist();

        // provide a small timeout so 
        // that animation can be seen
        
        setTimeout(()=> appHistory.goTo(url, e), delay);
    }, [url, delay]);

    title = title || (isAbsoluteURL?`${url}`:undefined);

    const ButtonContent = useMemo(()=> (
        <ButtonBase 
            focusRipple 
            className={ containerClass }
            onMouseDown={ onClick }
            TouchRippleProps={{
                classes : { ripple : classes.touchRipple }
            }}
        >{ children }
        </ButtonBase>
    ), [children, classes, containerClass, onClick]);

    if(title && title.length) {
        return (
            <Tooltip enterDelay={ 600 } title={ title } >
            { ButtonContent }
            </Tooltip>
        );
    } 
    else return ButtonContent;
}

export default ButtonLink