import React from 'react'
import injectSheet from 'react-jss'

const styleSheet = {
    sectionHighlighter : {
        position : 'absolute',
        width : '80px',
        height: '4px',
        backgroundColor : '#c51162',
        borderRadius : '1px',
        bottom : '0px',
        // shift the left position towards the last active
        // known button (+4px) when that is available
        left : ({ lastKnownIndex, buttonXOffsets })=>(
            buttonXOffsets && 
                buttonXOffsets.hasOwnProperty(lastKnownIndex) && 
                        ((buttonXOffsets[lastKnownIndex]+4)+'px')
        ),
        opacity : ({ index })=>( index != -1 ? 1 : 0 ), // only show on known indexes
        transition : 'left 0.65s ease-out 0.25s, opacity 0.4s',
    },
    '@media (max-width:400px)' : {
        // MUIButton switches between 88/68px on mobile, so considering
        // we adjust to things to (buttonWidth-8px)
        sectionHighlighter : {
            width : '60px !important',
            bottom : '2px' // seems height also adjusts slightly
        }
    }
}
function SectionHighlighter ({ buttonXOffsets, index, lastKnownIndex, classes }) {
    return (<div className={classes.sectionHighlighter}></div>);
}

export default injectSheet(styleSheet)(SectionHighlighter);