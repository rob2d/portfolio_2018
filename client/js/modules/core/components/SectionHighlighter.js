import { useMemo } from 'react';
import { styled, useStyles } from '@mui/material/styles';
import { useTheme } from '@mui/styles';

const PREFIX = 'SectionHighlighter';

const classes = {
    highlighter: `${PREFIX}-highlighter`
};

const Root = styled('div')(() => ({
    [`&.${classes.highlighter}`]: {
        position: 'absolute',
        width: '0px',
        height: '0px',
        borderLeft: p => p.borderEdge,
        borderRight: p => p.borderEdge,
        borderBottom: p => `${p.buttonH}px solid ${p.borderColor}`,
        top: p => p.appBarH - p.buttonH,
        left: p => `${p.buttonXOffset}px`,
        transform: `translateX(-50%)`,
        opacity: 1,
        transition: 'left 0.55s ease-out 0.25s, opacity 0.4s, ' +
            'border-color 0.27s linear, border-left 0.27s linear, ' +
            'border-right 0.27s linear, border-bottom 0.27s linear, ' +
            'bottom 0.27s linear'
    },
}));

export default function SectionHighlighter({
    buttonXs, sectionIndex, leftIndex,
    leftPadding, appBarH, buttonW, isSubsection
}) {
    const theme = useTheme();
    const { dark: borderColor } = theme.palette.secondary;

    const borderEdge = useMemo(() => (
        isSubsection ?
            '6px solid transparent' :
            `${buttonW?(buttonW/2):0}px solid ${borderColor}`
    ),[isSubsection, buttonW]);

    const buttonXOffset = useMemo(() => (
        (typeof buttonXs?.[sectionIndex] != 'number') ? 0 :
            (buttonXs[sectionIndex] + parseInt(leftPadding))
    ), [buttonXs?.[sectionIndex], leftPadding]);

    const buttonH = isSubsection ? 4: 6;

    return (
        <Root
            className={ classes.highlighter }
            appBarH={ appBarH }
            borderEdge={ borderEdge }
            borderColor={ borderColor }
            buttonXOffset={ buttonXOffset }
            buttonH={ buttonH }
            leftIndex={ leftIndex }
            sectionIndex={ sectionIndex }
        />
    );
}
