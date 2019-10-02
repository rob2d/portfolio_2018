import React, { useMemo } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    highlighter : {
        position : 'absolute',
        width : '0px',
        height: '0px',
        borderLeft : p => p.borderEdge,
        borderRight : p => p.borderEdge,
        borderBottom : p => `${p.buttonH}px solid ${p.borderC}`,
        top : p => p.appBarH - p.buttonH,
        left : p => `${p.buttonXOffset}px`,
        transform : `translateX(-50%)`,
        opacity : 1,
        transition : 'left 0.55s ease-out 0.25s, opacity 0.4s, ' +
            'border-color 0.27s linear, border-left 0.27s linear, ' + 
            'border-right 0.27s linear, border-bottom 0.27s linear, ' + 
            'bottom 0.27s linear'
    }
}), { name : 'SectionHighlighter' });

export default function SectionHighlighter ({ 
    buttonXs, sectionIndex, leftIndex, 
    leftPadding, appBarH, buttonW, isSubsection
}) {
    const theme = useTheme();
    const { dark:borderC } = theme.palette.secondary;

    const borderEdge = useMemo(()=> ( 
        isSubsection ? '6px solid transparent' :
        `${buttonW?(buttonW/2):0}px solid ${borderC}`
    ),[isSubsection, buttonW]);

    const buttonXOffset = useMemo(()=> (
        (typeof buttonXs?.[sectionIndex] != 'number') ? 0 :
            (buttonXs[sectionIndex] + parseInt(leftPadding))
    ), [buttonXs?.[sectionIndex], leftPadding]);

    const buttonH = isSubsection ? 4 : 6;

    const classes = useStyles({ 
        borderC, buttonW, buttonH, 
        borderEdge, buttonXOffset, sectionIndex, 
        leftIndex, leftPadding, appBarH, 
    });

    return (<div className={ classes.highlighter } />);
}