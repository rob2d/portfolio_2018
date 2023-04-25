import { useEffect, useRef, useCallback, useReducer } from 'react';
import useViewportSizes from 'use-viewport-sizes';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from '@mdi/react';
import { mdiSquare, mdiSquareOutline } from '@mdi/js';
import MediaViewer from './MediaViewer';
import ReelThumbs from './ReelThumbs';

const REEL_ANIM_SPEED = 10000;

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        overflow: 'visible',
        maxWidth: p => p.maxWidth,
        height: p => (
            // 25% diff to account for reel and status boxes
            `${Math.round(
                (Math.min(p.width || 0, p.maxWidth || 0)/(p.aspectRatio)) * 0.75
            )}px`
        ),
        margin: '0 auto 56px'
    },
    highlightedImageButton: {
        '&:hover $highlightedMediaImage': {
            border: '2px solid #c51162'
        },
        '&:active $highlightedMediaImage': {
            border: '2px solid #00b8d4;'
        }
    },
    highlightedMediaImage: {
        width: 'auto',
        maxWidth: '100%',
        height: 'auto',
        maxHeight: '10%',
        border: '2px solid rgba(255,255,255,0)',
        transition: 'border-color 0.24s ease-in'
    },
    highlightedMediaVideo: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000000'
    },
    reel: {
        flexBasis: '25%',
        height: '100%',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'row'
    },
    reelPadding: {
        flexBasis: '10%'
    },
    statusBoxes: {
        flexBasis: '5%',
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    statusBox: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: '0px 12px'
    },
    statusBoxIcon: {
        fontSize: '10pt'
    },
    fullScreenButton: {
        position: 'absolute',
        right: '16px',
        bottom: '16px'
    }
}), { name: 'MediaReel' });

const initialState = {
    selectedIndex: 0,
    mediaLength: 0,
    isVideoPlaying: false,
    lastUpdated: new Date()
};

function mediaReelReducer(state, action = undefined) {
    switch (action.type) {
        case 'set-media-length': {
            return {
                ...state,
                mediaLength: action.mediaLength
            };
        }
        case 'set-selection': {
            return {
                ...state,
                selectedIndex: action.selectedIndex
            };
        }
        case 'advance-selection': {
            return {
                ...state,
                selectedIndex: (state.selectedIndex + 1) % state.mediaLength
            };
        }
        case 'play-video': {
            return {
                ...state,
                isVideoPlaying: true
            };
        }

        case 'mark-last-update': {
            return {
                ...state,
                lastUpdated: new Date()
            };
        }
        default: {
            return state;
        }
    }
}

function useMediaReel() {
    const [state, dispatch] = useReducer(mediaReelReducer, initialState);

    const autoplayInterval = useRef(() => null);

    const handleVideoPlay = useCallback(() => {
        dispatch({ type: 'play-video' });
    }, []);

    const handleVideoStop = useCallback(() => {
        dispatch({ type: 'stop-video' });
    }, []);

    const handleItemClick = useCallback(selectedIndex => {
        dispatch({ type: 'set-selection', selectedIndex });
    }, []);

    const handleMediaChange = useCallback(media => {
        dispatch({ type: 'set-media-length', mediaLength: media.length });
    }, []);

    const handleMediaUpdate = useCallback(() => {
        dispatch({ type: 'mark-last-update' });
    }, []);

    // set/reset autoplay interval
    useEffect(() => {
        autoplayInterval.current = setInterval(() => dispatch({ type: 'advance-selection' }), REEL_ANIM_SPEED);
        return () => clearInterval(autoplayInterval.current);
    }, []);

    return [
        state.selectedIndex,
        handleItemClick,
        handleVideoPlay,
        handleVideoStop,
        handleMediaChange,
        handleMediaUpdate
    ];
}

export default function MediaReel({ media, width, maxWidth, aspectRatio, ...props }) {
    const [
        selectedIndex,
        handleItemClick,
        handleVideoPlay,
        handleVideoStop,
        handleMediaChange,
        handleMediaUpdate
    ] = useMediaReel();

    useEffect(() => { handleMediaChange(media) }, [media]);

    const [vpW, vpH] = useViewportSizes();
    const classes = useStyles({
        vpW,
        vpH,
        width,
        maxWidth,
        aspectRatio,
        ...props
    });

    return (
        <div className={ classes.container }>
            <MediaViewer
                { ...media?.[selectedIndex] }
                width={ Math.floor(width*0.7) }
                aspectRatio={ aspectRatio }
                vpW={ vpW }
                vpH={ vpH }
                onVideoPlay={ handleVideoPlay }
                onVideoStop={ handleVideoStop }
                onVideoPause={ undefined }
                onVideoEnd={ handleVideoStop }
                onUpdate={ handleMediaUpdate }
            />
            <div className={ classes.reel }>
                <div className={ classes.reelPadding } />
                {
                    vpW > 740 && (
                        <ReelThumbs
                            media={ media }
                            selectedIndex={ selectedIndex }
                            thumbHeight={
                                Math.round(
                                    Math.min(width || 0, maxWidth || 0)*0.25*0.75
                                ) / aspectRatio

                            }
                            onThumbClicked={ handleItemClick }
                            width={ width }
                            vpH={ vpH }
                        />
                ) }
                <div className={ classes.reelPadding } />
                <div className={ classes.statusBoxes }>
                    { media.map((_, i) => (
                        <div
                            key={ `mediaReelItem${i}` }
                            className={ classes.statusBox }
                            onKeyDown={ e => {
                                if(e.keyCode === 13) {
                                    handleItemClick(i);
                                }
                            } }
                            onClick={ () => handleItemClick(i) }
                        >
                            <Icon
                                path={ (i != selectedIndex) ? mdiSquareOutline : mdiSquare }
                                className={ classes.statusBoxIcon }
                                size={ 0.5 }
                            />
                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
}
