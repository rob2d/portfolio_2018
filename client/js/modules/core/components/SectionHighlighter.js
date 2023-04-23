import { useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/styles';

const Root = styled('div')(p => ({
    display: 'block',
    position: 'absolute',
    width: '0px',
    height: '0px',
    borderLeft: p.borderEdge,
    borderRight: p.borderEdge,
    borderBottom: `${p.buttonHeight}px solid ${p.borderColor}`,
    top: p.appBarHeight - p.buttonHeight,
    left: `${p.buttonXOffset}px`,
    transform: `translateX(-50%)`,
    opacity: 1,
    transition: 'left 0.55s ease-out 0.25s, opacity 0.4s, ' +
        'border-color 0.27s linear, border-left 0.27s linear, ' +
        'border-right 0.27s linear, border-bottom 0.27s linear, ' +
        'bottom 0.27s linear'
}));

export default function SectionHighlighter({
    buttonXs, sectionIndex, leftIndex,
    leftPadding, appBarHeight, buttonW, isSubsection
}) {
    const theme = useTheme();
    const { dark: borderColor } = theme.palette.secondary;

    const borderEdge = useMemo(() => (
        isSubsection ?
            '6px solid transparent' :
            `${buttonW ? (buttonW / 2) : 0}px solid ${borderColor}`
    ),[isSubsection, buttonW]);

    const buttonXOffset = useMemo(() => (
        (typeof buttonXs?.[sectionIndex] != 'number') ? 0 :
            (buttonXs[sectionIndex] + parseInt(leftPadding))
    ), [buttonXs?.[sectionIndex], leftPadding]);

    console.log({ borderEdge, buttonXOffset });

    return (
        <Root
            appBarHeight={ appBarHeight }
            borderEdge={ borderEdge }
            borderColor={ borderColor }
            buttonXOffset={ buttonXOffset }
            buttonHeight={ isSubsection ? 4: 6 }
            leftIndex={ leftIndex }
            sectionIndex={ sectionIndex }
        />
    );
}
