import React, { Fragment } from 'react'
import injectSheet         from 'react-jss'

function getBarXsition ({ index }) {
    const attribs = `0.30s linear ${
        Number(((index+1)*0.1).toFixed(2))+'s'
    }`;
    return `width ${attribs}`;
}

const styleSheet = {
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
        transition : getBarXsition
    }
};

const ValueBar = injectSheet(styleSheet)(
    ({ classes, isVisible, index, value }) => (
        <div className={classes.container}>
            <div className={classes.bar}>
            </div>
        </div>
    )
);

export default ValueBar