import React from 'react'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import injectSheet from 'react-jss'

/**
 * usage : connectPureWithStyles(styleSheet)(connectParams)(component)
 * @param styleSheet
 * @returns {function(*=)}
 */
export const connectPureWithStyles = (styleSheet)=>
{
    const styleWrapper = injectSheet(styleSheet);
    return (connectParams)=> {
        return (component)=>(pure(connect(connectParams)(component)));
    };
};

export default {
    connectPureWithStyles
}