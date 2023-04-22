import { useRef, useLayoutEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import useViewportSizes from 'use-viewport-sizes';
import ReelThumb from './ReelThumb';

const PREFIX = 'ReelThumbs';

const classes = {
    reelThumbs: `${PREFIX}-reelThumbs`
};

const Root = styled('div')(() => ({
    [`&.${classes.reelThumbs}`]: {
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
}));

export default function ReelThumbs({
    selectedIndex, media, thumbHeight, onThumbClicked
}) {
    const [vpW, vpH] = useViewportSizes();

    const containerElem = useRef(null);

    useLayoutEffect(() => {
        if(containerElem.current) {
            containerElem.current.scrollTop = ((thumbHeight+8) * selectedIndex);
        }
    }, [selectedIndex]);

    return (
        <Root
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
        </Root>
    );
}
