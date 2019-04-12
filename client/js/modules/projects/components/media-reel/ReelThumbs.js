import React, { 
    memo, useRef, useLayoutEffect, useCallback 
} from 'react'
import { makeStyles } from '@material-ui/styles'
import ReelThumb from './ReelThumb'

const useContainerStyles = makeStyles( theme => ({
    reelThumbs : {
        position       : 'relative',
        display        : 'flex',
        flexDirection  : 'column',
        boxSizing      : 'border-box',
        flexGrow       : 1,
        overflowY      : 'scroll',
        overflowX      : 'hidden',
        scrollBehavior : 'smooth', // works with polyfill
        flexBasis      : '80%',
        '&::-webkit-scrollbar': {
            display : 'none'
        }
    }
}), { name : 'ReelThumbs' });

function ReelThumbs ({ selectedIndex, media, thumbHeight, onThumbClicked }) {
    const classes = useContainerStyles();
    const containerElem = useRef(null);
    
    useLayoutEffect(()=> {
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
                    key={`reelThumbsSetItem${i}`}
                    onClick={ useCallback(()=> onThumbClicked(i), [i]) } 
                    thumbHeight={ thumbHeight }
                    item={ item }
                    isSelected={ selectedIndex == i }
                    media={ media }
                />
            )) }
        </div>
    );
}

export default memo(ReelThumbs)