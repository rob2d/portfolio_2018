import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/styles';

const DEFAULT_FADETIME = 320;

const useStyles = makeStyles(()=> ({
    fadeContainer : {
        transition : ({ fadeTime = DEFAULT_FADETIME })=> {
            if(typeof fadeTime == 'number' && fadeTime == 0) {
                return 'none';
            }

            const time = (typeof fadeTime == 'number') ?
            fadeTime + 'ms' : fadeTime;

            return `visibility ${time} ease-in, opacity ${time} ease-in`;
        },
        visibility : p => p.isShown ? 'visible' : 'hidden',
        opacity : p => p.isShown ? 1 : 0
    }
}), { name : 'ComponentFader' });

/**
 * Simple HOC which fades components in and out
 * accepts "isShown" and "fadeTime"(optional) as props
 */
export default WrappedComponent => (
    function ComponentFader({ fadeTime = DEFAULT_FADETIME, isShown, ...otherProps }) {
        const classes= useStyles({ fadeTime, isShown });
        const fadingContent = useMemo(()=> (
            <WrappedComponent
                { ...otherProps }
                fadeContainerClass={ classes.fadeContainer }    
            />
        ), [classes, WrappedComponent]);

        return fadingContent;
    }
)