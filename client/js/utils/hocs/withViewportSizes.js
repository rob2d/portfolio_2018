import React, { 
    PureComponent 
} from 'react'
import { connect } from 'react-redux'
import getDisplayName from 'recompose/getDisplayName'
import viewport from 'modules/viewport'
const { refreshWindowDimensions } = viewport.actions;

/**
 * injects viewport state
 * to viewable props within
 * a child container
 * 
 * NOTE : if you have to rely on
 * connect, probably not a great
 * idea to also use this in conjunction
 * with that (until a parameter is added
 * to aggregate connect function)
 * 
 * @param {*} WrappedComponent component to inject viewport
 *                          props into 
 */
function withViewportSizes(WrappedComponent) {
    class WithViewportSizes extends PureComponent {
        static displayName = `withViewportSizes(${getDisplayName(WrappedComponent)}`;
        
        onWindowResize = ()=> {
            this.props.refreshWindowDimensions();
        };
    
        componentDidMount () {
            window.addEventListener('resize', this.onWindowResize);
        }
    
        componentWillUnmount () {
            window.removeEventListener('resize', this.onWindowResize);
        }
        render () {
            return (
                <WrappedComponent { ...this.props } />
            );
        }
    }
    
    return connect(null, ({ 
        refreshWindowDimensions 
    }))(WithViewportSizes);
}

export default withViewportSizes