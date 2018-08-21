import React, { PureComponent } from 'react'
import shallowEqual from  'shallowequal'
import getDisplayName from 'recompose/getDisplayName'

export const withStatefulProps = (WrappedComponent)=> {
    return class StatefulPropsProvider extends PureComponent {
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
        componentDidMount () {
            this.hasMounted = true;
        }

        componentWillUnmount () {
            this.hasMounted = false;
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

export default withStatefulProps;