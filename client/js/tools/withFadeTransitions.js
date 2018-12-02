import React, { PureComponent } from 'react'
import componentFader from './componentFader'
import getDisplayName from 'recompose/getDisplayName'

// TODO : use propTypes with sensible defaults

/**
 * When a component mounts or unmounts, or a criteria 
 * is not met, this HOC causes it to fade
 * @param {*} WrappedComponent component
 *              to wrap
 * @prop fadeTime (optional) anim fade time when 
 * transitioning (if number, ms is assumed)
 * @prop fadeInDelay (optional) time in ms before fading in
 *                   component
 * @prop checkIfMounted checks props as an argument for 
 *                      a condition to mount/unmount; returns
 *                      true/false
 */
function withFadeTransitions (WrappedComponent) {
    const FadingComponent = componentFader(WrappedComponent);
    return class FadeTransitioner extends PureComponent {
        constructor (props) {
            super(props);
            // declare whether component should be shown 
            // when being created
            const { checkIfMounted, ...propsChecked } = props;            
            this.state = { 
                isShown : (checkIfMounted?checkIfMounted(propsChecked):true),
                hasJustMounted : false
            };
        }
        static displayName = `FadeTransitioner(${getDisplayName(FadingComponent)})`;
        componentWillReceiveProps(newProps) {
            console.error('||>componentWillReceiveProps');
            this.processNewProps(newProps);
        }
        processNewProps = (newProps)=> {
            console.error('||>processNewProps ->', newProps);
            const { 
                checkIfMounted, 
                ...propsChecked 
            } = this.props;

            const { 
                checkIfMounted:newCheckIfMounted, 
                ...newPropsChecked 
            } = newProps;

            const isShown= checkIfMounted ? 
                                checkIfMounted(this.props) : true;
            const nextIsShown= newCheckIfMounted ? 
                                    newCheckIfMounted(newPropsChecked) : true;

            if(nextIsShown != isShown && this._isMounted) {
                if(nextIsShown) {
                    setTimeout(()=>{
                        this.setState({ isShown : true });
                    }, this.props.fadeInDelay || 0);
                } else {
                    this.setState({ isShown : false });
                }
            }  
        };
        componentDidUpdate (prevProps, prevState) {
            // if the component just mounted,
            // allow a re-render to animate opacity
            if(this.state.hasJustMounted) {
                setTimeout(()=> {
                    this.setState({ hasJustMounted : false });
                }, this.props.fadeInDelay || 0);
            }
        }
        componentDidMount () {
            this._isMounted = true;
            this.setState({ hasJustMounted : true });
        }
        componentWillUnmount () {
            this._isMounted = false;
        }
        render () {
            const { fadeTime, ...props} = this.props;
            const { hasJustMounted, isShown } = this.state;

            return (
                <FadingComponent 
                    {...props} 
                    isShown={this._isMounted && isShown && !hasJustMounted} 
                    fadeTime={this.props.fadeTime || '1s'}
                />
            );            
        }   
    }
}

export default withFadeTransitions