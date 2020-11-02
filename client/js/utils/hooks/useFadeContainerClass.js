import { makeStyles } from '@material-ui/core/styles';

const DEFAULT_FADETIME = 320;

const useStyles = makeStyles(() => ({
    fadeContainer: {
        transition: p => {
            if(typeof p.fadeTime == 'number' && p.fadeTime == 0) {
                return 'none';
            }

            const time = (typeof p.fadeTime == 'number') ?
                `${p.fadeTime}ms` : p.fadeTime;

            return `visibility ${time} ease-in, ` +
                    `opacity ${time} ease-in`;
        },
        visibility: p => p.isShown ? 'visible': 'hidden',
        opacity: p => p.isShown ? 1: 0
    }
}), { name: 'useFadeContainerClass' });

export default function useFadeContainerClass(fadeTime=DEFAULT_FADETIME, isShown=false) {
    const classes = useStyles({ fadeTime, isShown });
    return classes.fadeContainer;
}
