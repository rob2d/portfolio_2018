import React from 'react'
import injectSheet from 'react-jss'
import injectJSSBehavior, {
    jssTransitionConfig,
    withStatefulProps
} from 'tools/react-jss-transitions'
import pure from 'recompose/pure'

jssTransitionConfig.setInjector(injectSheet);

const wait = (timeInMs)=>{
    return new Promise((resolve, reject) => {
        setTimeout(()=>{ resolve(); }, timeInMs);
    });
};

const styleStates = {
    default : {
        styleSheet: {
            container : {
                display    : 'block',
                color      : '#FFFFFF',
                background : '#FFFFFF',
                transition : 'background 0.5s'
            }
        },
        behavior : ({ setStatefulProps, statefulProps }) => {
            console.log('DEFAULT ENTERED');
            wait(2000).then(()=> {
                console.log('going from default->state2');
                setStatefulProps({ styleState : 'state2' });
            });
        }
    },
    state2 : {
        styleSheet : {
            container : {
                background : '#000000',
                color 	   : '#FFFFFF',
                display    : 'block',
                transition : 'background 0.5s'
            }
        },

        behavior : ({ setStatefulProps, statefulProps }) => {
            wait(2000).then(()=> {
                setStatefulProps({ styleState : 'state3' });
            })
        }
    },
    state3 : {
        styleSheet : {
            container : {
                background : '#FF0000',
                color      : '#000000',
                display    : 'block',
                transition : 'background 0.5s'
            }
        },

        behavior : ({ setStatefulProps, statefulProps }) => {
            wait(2000).then(()=> {
                console.log('BACK TO DEFAULT :D');
                setStatefulProps({ styleState : 'default' })
            })
        }
    }
};

export default injectJSSBehavior({ styleStates, defaultStyleState : 'default' })(
    function JSSTransitionedThing({ classes }){
        return (
            <div className={classes.container}>
                I am a component to represent all of your JSS 
                style dreams. Soon, I will change!
            </div>
        );
    }
);



/**

Example 2

const styleSheet = {
    container : ({ label, setStatefulProps })=> {
        if(!label) {
            label = 'Woo';
        }else {
            setTimeout(()=>{
                label += 'o';
            }, 350);
        }
    }
};

export default withStatefulProps(injectStylesheet(styleSheet)
    (function JSSTransitionExample({ label, classes }) {
        return (
            <div style={{width: '400px', height: '200px'}}>
                {label}
            </div>
        )
    })
);

**/

//export default