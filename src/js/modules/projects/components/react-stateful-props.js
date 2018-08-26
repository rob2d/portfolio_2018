import React, { PureComponent } from 'react'
import shallowEqual from  'shallowequal'
import getDisplayName from 'recompose/getDisplayName'

export const withStatefulProps = ( WrappedComponent, asNonPure=false ) => {
    const BaseComponent = asNonPure ? Component : PureComponent;

    return class StatefulPropsProvider extends BaseComponent {
        constructor (props) {
            super(props);
            this.state = { keys : { ...props } };
        }
        static displayName = `withStatefulProps(${getDisplayName(WrappedComponent)})`;
        setStatefulProps = (keys)=> {
            this.setState({ ...keys });
        };

        processProps = (props)=> {
            // check if each prop is immutably equal before
            // processing a new set of keys
            if(!shallowEqual(props, this.props)) {
                this.setState({ keys : { ...this.state, ...props }});
            }
        };

        componentWillReceiveProps (nextProps) {
            this.processProps(nextProps);
        }

        componentWillMount () {
            this.processProps(this.props);
        }
        
        render () {
            return (
                <WrappedComponent
                    {...this.state.keys}
                    setStatefulProps={this.setStatefulProps}
                />
            );
        }
    }
};

export default withStatefulProps