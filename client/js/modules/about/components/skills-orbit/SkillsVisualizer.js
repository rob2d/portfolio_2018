import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import useSkillOrbsScene from './useSkillOrbsScene';

const useStyles = makeStyles(() => ({
    canvas3d: {
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        pointerEvents: 'all',
        transitionProperty: 'opacity',
        transitionDelay: p => p.isHighlighted ? '0s' : '1s',
        transitionDuration: '0.75s',
        transitionTimingFunction: 'ease'
    }
}), 'SkillsVisualizer');

export default function SkillsVisualizer({ className }) {
    const [containerRef, isHighlighted] = useSkillOrbsScene();
    const classes = useStyles({ isHighlighted });

    return (
        <div
            ref={ containerRef }
            className={ clsx(classes.canvas3d, className) }
        />
    );
}
