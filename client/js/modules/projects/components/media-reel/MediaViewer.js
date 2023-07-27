import { useCallback, useMemo, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import ButtonLink from 'utils/components/ButtonLink';
import YouTube from 'react-youtube';

const styles = ({ palette: { secondary, common } }) => ({
    container: {
        display: 'flex',
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        flexBasis: '75%',
        maxWidth: '100%',
        height: '100%',
        margin: 0,
        padding: 0
    },
    mediaContainerButton: {
        cursor: 'pointer',
        border: `2px solid ${secondary.dark}`,
        '&:hover': {
            border: `2px solid ${secondary.main}`
        },
        '&:active': {
            border: `2px solid ${common.active}`
        },
        maxWidth: p => `min(100%, ${p.width}px)`,
        width: p => `min(100%, ${p.width}px)`,
        '& img': {
            maxWidth: p => `min(100%, ${p.width}px)`
        }
    },
    image: {
        maxWidth: p => `100%`,
        width: p => `${p.width}px`,
        height: p => `${(p.width / p.aspectRatio)}px`,
        transition: 'border-color 0.24s ease-in'
    },
    mediaContainer: {
        maxWidth: p => `min(${p.width}px, 100%)`,
        width: p => `${p.width}px`,
        height: p => (
            `${(p.width / p.aspectRatio)}px`
        ),
        cursor: 'pointer',
        '& iframe': {
            width: p => `${p.width}px`,
            maxWidth: p => `${p.width}px`,
            height: '100%'
        },
        '& img': {
            maxWidth: '100%'
        }
    },
    caption: {
        display: 'flex',
        minHeight: '48px',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        bottom: '-48px',
        textAlign: 'center',
    },
    loader: {
        position: 'absolute',
        display: 'flex',
        pointerEvents: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        right: '0',
        bottom: '0',
        zIndex: '1000'
    }
});

const map = new Map();

function MediaViewer({
    onVideoPlay,
    onVideoEnd,
    onVideoStop,
    onVideoPause,
    type,
    src,
    videoId,
    thumb,
    updateCount,
    classes,
    caption,
    isMediaLoading,
    onUpdate,
    aspectRatio,
    vpW,
    vpH,
    width,
    height
}) {
    const cacheMap = useRef(map);

    const getItemKey = useCallback(() => {
        switch (type) {
            case 'image':
                return `${type}_${src}`;
            case 'video':
                return `${type}_${videoId}`;
            default:
                throw new Error('Invalid Media Type');
        }
    }, [type, src]);

    const onYTStateChange = useCallback(state => {
        if(state && state.data) {
            switch (state.data) {
                case 3:
                    // buffering; e.g. user clicked
                    // YT vid but hasn't played yet
                    onVideoPlay();
                    break;
            }
        }
    }, [type, src, onVideoPlay]);

    const ytState = useMemo(() => {
        const nextState = {
            type,
            src,
            thumb,
            videoId,
            vpW,
            vpH,
            updateCount,
            height: width / aspectRatio,
            ytOpts: { width, height },
        };

        const itemKey = getItemKey(nextState);

        if(cacheMap.current.has(itemKey)) {
            switch (type) {
                case 'video':
                    // TODO: check if the updateTime changed
                    cacheMap.current.get(itemKey).isMediaLoading = true;
                    break;
                default: {
                    break;
                }
            }
        }
        else {
            const resource = {
                isMediaLoading: true,
                domSegment: undefined // assigned below
            };

            switch (type) {
                case 'image': {
                    resource.img = new Image();
                    resource.img.src = src;
                    resource.img.onload = () => {
                        cacheMap.current.get(itemKey).isMediaLoading = false;
                        onUpdate();
                    };

                    resource.thumb = thumb;

                    const { protocol, host } = window.location;
                    resource.url = `${protocol}//${host}${src}`;
                    resource.domSegment = (
                        <ButtonLink
                            url={ resource.url }
                            title={ 'Open full res image in new tab' }
                            className={ classes.mediaContainerButton }
                        > <img className={ classes.image } src={ src } />
                        </ButtonLink>
                    );
                    break;
                }
                case 'video': {
                    resource.url = `https://youtube.com/watch?v=${videoId}`;
                    resource.thumb = `https://img.youtube.com/vi/${videoId}/default.jpg`;
                    resource.domSegment = (
                        <YouTube
                            key={ itemKey }
                            id={ itemKey }
                            videoId={ videoId }
                            containerClassName={ classes.mediaContainer }
                            className={ classes.mediaContainer }
                            opts={ nextState.ytOpts }
                            width={ nextState.width }
                            height={ nextState.height }
                            onReady={ () => {
                                const thisItem = cacheMap.current.get(itemKey);
                                thisItem.isMediaLoading = false;
                                onUpdate();
                            } }
                            onPlay={ onVideoPlay }
                            onStop={ onVideoStop }
                            onEnd={ onVideoEnd }
                            onPause={ onVideoPause }
                            onStateChange={ onYTStateChange }
                        />
                    );
                    break;
                }
                default:
                    throw new Error('Invalid media type ->', type);
            }

            cacheMap.current.set(itemKey, {
                resource,
                isMediaLoading: true
            });
        }

        return nextState;
    },
    [
        type,
        src,
        thumb,
        videoId,
        vpW,
        vpH,
        width,
        height,
        aspectRatio,
        cacheMap
    ]);

    const { resource } = cacheMap.current.get(getItemKey(ytState));

    const bgLoadingStyle= (isMediaLoading) ? {
        backgroundImage: `url(${resource.thumb})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        filter: 'blur(5px) brightness(50%)',
        transition: 'filter 0.35s, opacity 0.35s'
    }: undefined;

    const mediaElement = !isMediaLoading ? resource.domSegment : (
        <ButtonLink
            url={ resource.url }
            className={ classes.mediaContainerButton }
        >{ resource.domSegment }
        </ButtonLink>
    );

    return (
        <div className={ classes.container }>
            <div className={ classes.mediaContainer } style={ bgLoadingStyle }>
                { mediaElement }
            </div>
            { isMediaLoading && (
                <div className={ classes.loader }>
                    <CircularProgress color={ 'secondary' } size={ (vpW <= 800) ? 40: 64 } />
                </div>
            ) }
            <Typography className={ classes.caption } variant={ 'caption' }>
                { caption }
            </Typography>
        </div>
    );
}

export default withStyles(styles)(MediaViewer);
