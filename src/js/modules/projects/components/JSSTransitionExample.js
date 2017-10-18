import React from 'react'
import injectSheet from 'react-jss'
import injectJSSBehavior, {
    jssTransitionConfig,
    withStatefulProps
} from 'tools/react-jss-transitions'

jssTransitionConfig.setInjector(injectSheet);

const wait = (timeInMs)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{ resolve(); }, timeInMs);
    });
};

const styleStates = {
    default : {
        styleSheet: {
            container : {
                display : ({ isShown })=>( isShown ? 'block' : 'none' )
            }
        },
        behavior : ({ setStatefulProps, statefulProps })=>{
            if(keys.isShown){
                wait(500).then(()=>{
                    setStatefulProps({ styleState : 'anotherStyleKey' });
                });
            }
        }
    },
    anotherStyleKey : {
        styleSheet : {
            container : {
                background : '#000000',
                color 	   : '#FFFFFF'
            }
        }
    }
};

export default injectJSSBehavior({ styleStates, defaultStyleState : 'default' })(({ classes })=>(
    <div className={classes.container}>
        I am a component to represent all of your JSS style dreams. In half second I will change
    </div>
));



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