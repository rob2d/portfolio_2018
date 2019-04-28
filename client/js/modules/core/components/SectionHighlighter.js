import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles( theme => ({
    sectionHighlighter : {
        position : 'absolute',
        width : '0px',
        height: '0px',
        borderLeft : ({ borderEdge }) => borderEdge,
        borderRight : ({ borderEdge }) => borderEdge,
        borderBottom : ({ buttonHeight })=>(`${buttonHeight}px solid #c51162`),

        // we'll need to offset the button based on
        // its position because of discrepencies between
        // chrome/firefox/ie

        // we also offset based on whether a project
        // is selected (currently, if sectionIndex == -1 or not)

        top : ({ appBarHeight, buttonHeight, containerHeight })=>(
            appBarHeight - buttonHeight
        ),

        // shift the left position towards the last active
        // known button when that is available
        
        left : ({ sectionIndex, buttonXPositions, leftPadding=0 }) => {
            return (
                (buttonXPositions && 
                buttonXPositions.hasOwnProperty(sectionIndex) && 
                        ((buttonXPositions[sectionIndex] )+parseInt(leftPadding) )+'px')
        )},
        transform : 'translateX(-50%)',
        opacity : 1,
        transition : 'left 0.55s ease-out 0.25s, opacity 0.4s, ' +
                     'border-color 0.27s linear, border-left 0.27s linear, ' + 
                     'border-right 0.27s linear, border-bottom 0.27s linear, ' + 
                     'bottom 0.27s linear'
    }
}), { name : 'SectionHighlighter' });

function SectionHighlighter (props) {
    const borderEdge = useMemo(()=>{
        return (props.isSubsection ?
            '6px solid transparent':
            `${(props.buttonWidth/2)}px solid #c51162`
        );
    },[props.isSubsection, props.buttonWidth]);

    const classes = useStyles({ 
        ...props, 
        borderEdge,
        buttonHeight : (props.isSubsection) ? 4 : 6
    });

    return (<div className={ classes.sectionHighlighter }></div>);
}

SectionHighlighter.propTypes = {
    buttonXPositions : PropTypes.arrayOf(PropTypes.number), 
    sectionIndex : PropTypes.number, 
    leftPadding : PropTypes.number, 
    appBarHeight : PropTypes.number, 
    buttonWidth : PropTypes.number
};

export default SectionHighlighter