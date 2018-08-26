import React, { PureComponent } from 'react'
import shallowEqual from  'shallowequal'
import getDisplayName from 'recompose/getDisplayName'

export const withStatefulProps = (TheComponent)=>({  
    onSetStatefulProps=undefined, 
    statefulProps={},
    asNonPure=false 
}) => {
    const BaseComponent = asNonPure ? Component : PureComponent;

    return class StatefulPropsProvider extends BaseComponent {
        constructor (props) {
            super(props);
            this.state = { keys : { ...props } };
        }

        componentDidMount () {
            this._isMounted = true;
            if(statefulProps) {
                this.setStatefulProps(statefulProps);
            } else {
                console.log('!statefulProps');
            }
        }
        
        static displayName = `withStatefulProps(${getDisplayName(TheComponent)})`;

        setStatefulProps = (statefulProps)=> {

            if(this._isMounted) {
                let keys = Object.assign({}, 
                    { ...this.state.keys }, 
                    { ...statefulProps }
                );
    
                if(onSetStatefulProps) {
                    onSetStatefulProps({ 
                        statefulProps, 
                        props : { 
                            ...keys, 
                            setStatefulProps : this.setStatefulProps 
                        }
                    });
                }
    
                this.setState({ keys });
            }
        };

        processProps = (props)=> {
            // check if each prop is immutably equal before
            // processing a new set of keys
            if(!shallowEqual(props, this.props) && this._isMounted) {
                this.setState({ keys : { ...this.state, ...props }});
            }
        };

        componentWillReceiveProps (nextProps) {
            this.processProps(nextProps);
        }

        componentWillUnmount () {
            this._isMounted = false;
        }

        
        render () {
            return (
                <TheComponent
                    {...this.state.keys}
                    setStatefulProps={this.setStatefulProps}
                />
            );
        }
    }
};

export default withStatefulProps