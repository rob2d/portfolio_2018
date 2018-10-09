import { connect }    from 'react-redux'
import getDisplayName from 'recompose/getDisplayName'

/**
 * Simple HOC which just connects theme prop
 * to component
 * 
 * @param {React.Component} WrappedComponent 
 */
const withTheme = WrappedComponent => {
    return connect(
        ({ core }) => ({ theme : core.theme })
    )(WrappedComponent);
};

export default withTheme