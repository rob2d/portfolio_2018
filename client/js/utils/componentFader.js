import React, { memo } from 'react'
import { makeStyles } from '@material-ui/styles'

const DEFAULT_FADETIME = 500;

const useStyles = makeStyles( theme => ({
    fadeContainer :
    {
        transition : ({ fadeTime = DEFAULT_FADETIME })=> {
            if(typeof fadeTime == 'number' && fadeTime == 0) {
                return 'none';
            }

            const time = (typeof fadeTime == 'number') ?
            fadeTime + 'ms' : fadeTime;

            return `visibility ${time}, opacity ${time}`;
        },
        visibility : ({ isShown })=> (isShown?'visible':'hidden'),
        opacity    : ({ isShown })=> (isShown?1:0)
    }
}), { name : 'componentFader' });

// TODO | append displayName at appropriate points
// TODO | when generating


/**
 * Simple HOC which fades components in and out;
 *
 * accepts "isShown" and "fadeTime"(optional) as props
 */
export const componentFader = WrappedComponent => memo(
function ComponentFader({ fadeTime = DEFAULT_FADETIME, isShown, ...otherProps }) {
    const classes= useStyles({ fadeTime, isShown });
    return (
        <div className={classes.fadeContainer}>
            <WrappedComponent 
                { ...otherProps } 
                faderClasses={classes}     
            />
        </div>
    )
});
export default componentFader