import React       from 'react'
import injectSheet from 'react-jss'

let FadingOrbitContainer = injectSheet({   
    canvas3d : {
        position       : 'relative',
        display        : 'flex',
        overflow       : 'hidden',
        justifyContent : 'center',
        alignItems     : 'center',
        pointerEvents  : 'all',
        paddingBottom  : '16px',
        opacity        : ({ isHighlighted }) => (isHighlighted ? 0 : 1),
        transition     : ({ isHighlighted }) => (isHighlighted ? 
            '0.75s ease opacity 0s' :
            '0.75s ease opacity 1s'
        )
    }
 })(function OrbitContainer ({ classes, isHighlighted }) { 
        return (
            <div 
                id="canvas3d" 
                className={ classes.canvas3d } 
            />
        );
    }
);

export default FadingOrbitContainer