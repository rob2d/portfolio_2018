import React, { memo, Fragment } from 'react'
import { makeStyles } from '@material-ui/styles'

function getBarXsition ({ index }) {
    const attribs = `0.30s linear ${
        Number(((index+1)*0.1).toFixed(2))+'s'
    }`;
    return `width ${attribs}`;
}

const useValueBarStyles = makeStyles( theme => ({
    container : { 
        width : '100%',
        transition : 'border-color 0.5s',
        height : '4px'
    },
    bar : {
        display : 'block',
        width   : ({ isVisible, value }) => (
            (isVisible ? (value * 100)  : '0') + '%'
        ),
        height : '100%',
        backgroundColor : '#c51162',
        transition : ({ index }) => {
            const attribs = `0.30s linear ${Number(((index+1)*0.1).toFixed(2))+'s'}`;
            return `width ${attribs}`;
        }
    }
}));
function ValueBar ({ isVisible, index, value }) {
    const classes = useValueBarStyles({ isVisible, index, value });

    return (
        <div className={classes.container}>
            <div className={classes.bar} />
        </div>
    );
}

export default memo(ValueBar)