import { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from '@mdi/react';
import { mdiYoutube } from '@mdi/js';

const useStyles = makeStyles(() => ({
    reelThumbImg: {
        display: 'block',
        boxSizing: 'border-box',
        width: '100%',
        height: p => `${((1/p.aspectRatio)*100).toFixed(2)}%`
    },
    reelThumbSelected: {
        border: '2px solid rgb(0,175,200) !important'
    },
    reelThumbContainer: {
        position: 'relative',
        left: 0,
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        border: '2px solid rgba(0,0,0,0)',
        width: '100%',
        minHeight: p => (`${p.thumbHeight}px !important`),
        height: p => (`${p.thumbHeight}px !important`),
        marginTop: '4px',
        marginBottom: '4px',
        cursor: 'pointer'
    },
    thumbSelectedOverlay: {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        backgroundColor: 'rgba(0,175,200,0.5)',
        zIndex: 1
    },
    ytThumbIcon: {
        fill: '#D00',
        backgroundColor: '#FFF',
        fontSize: '28pt',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}), { name: 'ReelThumb' });

export default function ReelThumb({ onClick, isSelected, thumbHeight, item }) {
    const classes = useStyles({ thumbHeight });
    const onKeyDown = useCallback(e => {
        // handle enter key for accessibility
        if(e.keyCode === 13) {
            onClick();
        }
    }, [onClick]);

    return (
        <div
            className={
                `${classes.reelThumbContainer} ${
                    isSelected ? classes.reelThumbSelected : ''}`
                }
            onClick={ onClick }
            onKeyDown={ onKeyDown }
        >
            {/* selected overlay if applicable */}
            { isSelected && (<div className={ classes.thumbSelectedOverlay } />) }
            { (item.type == 'image') &&
                (<img className={ classes.reelThumbImg } src={ item.thumb } />)
            }
            { (item.type == 'video') && (
                <Icon
                    path={ mdiYoutube }
                    className={ classes.ytThumbIcon }
                    size={ 2 }
                />
            )
            }
        </div>
    );
}
