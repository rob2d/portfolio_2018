import React from 'react';
import injectSheet from 'react-jss';
import pure from 'recompose/pure';

const DEFAULT_FADETIME = 500;

const styleSheet =
{
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
};

// TODO | append displayName at appropriate points
// TODO | when generating


/**
 * Simple HOC which fades components in and out;
 *
 * accepts "isShown" and "fadeTime"(optional) as props
 */
export const componentFader = (WrappedComponent)=>(injectSheet(styleSheet)(
({ classes, ...propsWOClasses })=>
{
    console.log('classes ->', classes);
    console.log('isShown ->', propsWOClasses.isShown);
    return (
    <div className={classes.fadeContainer}>
        <WrappedComponent {...propsWOClasses} faderClasses={classes} />
    </div>
)}));
export default componentFader;