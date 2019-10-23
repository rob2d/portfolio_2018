import React, { useMemo, useCallback } from 'react';
import clsx from 'clsx';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import appHistory from 'utils/appHistory';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(({ palette : { text } }) => ({
    container : {
        cursor : 'pointer'
    },
    touchRipple : {
        color : p => p.rippleColor || text.primary
    }
}));

export default function ButtonLink({
    url, containerClass, children,title=undefined,
    delay=250, rippleColor, asButton=true
}) {
    const classes = useStyles({ rippleColor });
    const isAbsoluteURL = useMemo(() => url.indexOf('://') != -1, [url]);
    const onClick = useCallback( e => {
        e.persist();

        // provide a small timeout so
        // that animation can be seen

        setTimeout(() => appHistory.goTo(url, e), delay);
    }, [url, delay]);

    title = title || (isAbsoluteURL?`${url}`:undefined);

    const ButtonContent = useMemo(() => asButton ? (
        <ButtonBase
            focusRipple
            className={ clsx(classes.container, containerClass) }
            onMouseDown={ onClick }
            TouchRippleProps={{ classes : { ripple : classes.touchRipple } }}
        >{ children }
        </ButtonBase>
    ) : (
        <span
            className={ clsx(classes.container, containerClass) }
            onMouseDown={ onClick }
        >{ children }
        </span>
    ), [children, classes, containerClass, onClick]);

    if(title && title.length) {
        return (
            <Tooltip enterDelay={ 600 } title={ title }>
                { ButtonContent }
            </Tooltip>
        );
    }
    else return ButtonContent;
}
