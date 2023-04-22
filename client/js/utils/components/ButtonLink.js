import { useMemo, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import ButtonBase from '@mui/material/ButtonBase';
import appHistory from 'utils/appHistory';
import Tooltip from '@mui/material/Tooltip';

const PREFIX = 'ButtonLink';

const classes = {
    container: `${PREFIX}-container`,
    touchRipple: `${PREFIX}-touchRipple`
};

const StyledTooltip = styled(Tooltip)(({
    theme: { palette: { text } }
}) => ({
    [`& .${classes.container}`]: {
        cursor: 'pointer'
    },

    [`& .${classes.touchRipple}`]: {
        color: p => p.rippleColor || text.primary
    }
}));

export default function ButtonLink({
    url, className, children,title=undefined,
    delay=250, rippleColor, asButton=true,
    name=children
}) {

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
            className={ clsx(classes.container, className) }
            onMouseDown={ onClick }
            TouchRippleProps={{ ripple: classes.touchRipple }}
            aria-label={ name }
        >{ children }
        </ButtonBase>
    ) : (
        <span
            className={ clsx(classes.container, className) }
            onMouseDown={ onClick }
        >{ children }
        </span>
    ), [children, classes, className, onClick]);

    if(title && title.length) {
        return <StyledTooltip enterDelay={ 600 } title={ title }>{ ButtonContent }</StyledTooltip>;
    }
    else return ButtonContent;
}
