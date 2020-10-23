import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useSkillsOrbitScene from './useSkillsOrbitScene';

const useStyles = makeStyles(() => ({
    canvas3d: {
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'all',
        paddingBottom: '16px',
        opacity: ({ isHighlighted }) => (isHighlighted ? 0 : 1),
        transitionDelay: p => p.isHighlighted ? '0s' : '1s',
        transitionDuration: '0.75s',
        transitionTimingFunction: 'ease'
    }
}), 'FadingOrbitContainer');

export default function FadingOrbitContainer() {
    const [containerRef, isHighlighted] = useSkillsOrbitScene();
    const classes = useStyles({ isHighlighted });

    return (<div ref={ containerRef } className={ classes.canvas3d } />);
}
