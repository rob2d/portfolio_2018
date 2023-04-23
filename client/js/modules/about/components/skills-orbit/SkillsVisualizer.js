import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import useSkillOrbsScene from './useSkillOrbsScene';

const PREFIX = 'SkillsVisualizer';

const classes = {
    canvas3d: `${PREFIX}-canvas3d`
};

const Root = styled('div\r\n')(() => ({
    [`& .${classes.canvas3d}`]: {
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        pointerEvents: 'all',
        transitionProperty: 'opacity',
        transitionDelay: p => p.isHighlighted ? '0s' : '1s',
        transitionDuration: '0.75s',
        transitionTimingFunction: 'ease'
    }
}));

export default function SkillsVisualizer({ className }) {
    const [containerRef, isHighlighted] = useSkillOrbsScene();

    return (
        <div
            ref={ containerRef }
            className={ clsx(classes.canvas3d, className) }
        />
    );
}
