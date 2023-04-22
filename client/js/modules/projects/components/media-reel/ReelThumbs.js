import { useRef, useLayoutEffect, useCallback } from 'react';
import { makeStyles } from '@mui/material/styles';
import useViewportSizes from 'use-viewport-sizes';
import ReelThumb from './ReelThumb';

const useStyles = makeStyles(() => ({
    reelThumbs: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        flexGrow: 1,
        overflowY: 'scroll',
        overflowX: 'hidden',
        scrollBehavior: 'smooth', // works with polyfill
        flexBasis: '80%',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    }
}), { name: 'ReelThumbs' });

export default function ReelThumbs({
    selectedIndex, media, thumbHeight, onThumbClicked
}) {
    const [vpW, vpH] = useViewportSizes();
    const classes = useStyles({ vpH });
    const containerElem = useRef(null);

    useLayoutEffect(() => {
        if(containerElem.current) {
            containerElem.current.scrollTop = ((thumbHeight+8) * selectedIndex);
        }
    }, [selectedIndex]);

    return (
        <div
            className={ classes.reelThumbs }
            ref={ containerElem }>
            { media.map((item, i) => (
                <ReelThumb
                    key={ `reelThumbsSetItem${i+1}` }
                    onClick={ useCallback(() => onThumbClicked(i), [i]) }
                    thumbHeight={ thumbHeight }
                    item={ item }
                    isSelected={ selectedIndex == i }
                    media={ media }
                />
            )) }
        </div>
    );
}
