import { PureComponent } from 'react';
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
        maxWidth: p => `${p.width}px`,
        width: p => `${p.width}px`
    },
    image: {
        maxWidth: p => `${p.width}px`,
        width: p => `${p.width}px`,
        height: p => `${(p.width / p.aspectRatio)}px`,
        transition: 'border-color 0.24s ease-in'
    },
    mediaContainer: {
        maxWidth: p => `${p.width}px`,
        width: p => `${p.width}px`,
        height: p => (
            `${(p.width / p.aspectRatio)}px`
        ),
        cursor: 'pointer',
        '& iframe': {
            width: p => `${p.width}px`,
            maxWidth: p => `${p.width}px`,
            height: '100%'
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

class MediaViewer extends PureComponent {

    constructor(props) {
        super(props);

        const { disableCache } = props;
        this.state = {
            cacheMap: disableCache ? undefined: new Map()
        };
    }

    /**
     * detects when youtube state changes
     */
    static onYTStateChange = (state, props) => {
        if(state && state.data) {
            switch (state.data) {
                case 3: // 3: buffering; e.g. user clicked
                    // YT vid but hasn't played yet
                    props.onVideoPlay();
                    break;
            }
        }
    };

    static getItemKey(props) {
        const { type, src, videoId } = props;

        switch (props.type) {
            case 'image':
                return `${type}_${src}`;
            case 'video':
                return `${type}_${videoId}`;
            default:
                throw new Error('Invalid Media Type');
        }
    }

    static getDerivedStateFromProps(props, state) {

        // when a prop related to resources change,
        // our isMediaLoading state should
        // reset to true (and update trailing props
        // which allow us to re-flag)

        if(((props.type != state.type) ||
           (props.src != state.src) ||
           (props.videoId != state.videoId) ||
           (props.width != state.width) ||
           (props.vpH != state.vpH) ||
           (props.vpW != state.vpW) ||
           (props.aspectRatio != state.aspectRatio)
        )) {

            const newState = {
                type: state.src,
                src: props.src,
                thumb: props.thumb,
                videoId: props.videoId,
                vpW: props.vpW,
                vpH: props.vpH,
                updateCount: props.updateCount,
                height: props.width / props.aspectRatio,
                ytOpts: { width: props.width, height: props.height },
            };

            const { cacheMap } = state;
            const itemKey = MediaViewer.getItemKey(props);

            if(cacheMap && cacheMap.has(itemKey)) {
                switch (props.type) {
                    case 'video':
                        // TODO: we should be saving
                        //        video element so that
                        //        it does not need to
                        //        reload iFrame
                        if(props.updateCount == state.updateCount) {
                            cacheMap.get(itemKey).isMediaLoading = true;
                        }
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

                switch (props.type) {
                    case 'image': {
                        resource.img = new Image();
                        resource.img.src = props.src;
                        resource.img.onload = () => {
                            cacheMap.get(itemKey).isMediaLoading = false;
                            props.onUpdate();
                        };

                        resource.thumb = props.thumb;

                        const { protocol, host } = window.location;
                        resource.url = `${protocol}//${host}${props.src}`;
                        resource.domSegment = (
                            <ButtonLink
                                url={ resource.url }
                                title={ 'Open full res image in new tab' }
                                className={ props.classes.mediaContainerButton }
                            > <img
                                className={ props.classes.image }
                                src={ props.src }
                            />
                            </ButtonLink>
                        );
                        break;
                    }
                    case 'video': {

                        const {
                            onVideoPlay,
                            onVideoStop,
                            onVideoPause,
                            onVideoEnd,
                            videoId
                        } = props;

                        resource.url = `https://youtube.com/watch?v=${videoId}`;
                        resource.thumb = `https://img.youtube.com/vi/${videoId}/default.jpg`;
                        resource.domSegment = (
                            <YouTube
                                key={ itemKey }
                                id={ itemKey }
                                videoId={ videoId }
                                containerClassName={ props.classes.mediaContainer }
                                className={ props.classes.mediaContainer }
                                opts={ newState.ytOpts }
                                width={ newState.width }
                                height={ newState.height }
                                onReady={ () => {
                                    const thisItem = cacheMap.get(itemKey);
                                    thisItem.isMediaLoading = false;
                                    props.onUpdate();
                                } }
                                onPlay={ onVideoPlay }
                                onStop={ onVideoStop }
                                onEnd={ onVideoEnd }
                                onPause={ onVideoPause }
                                onStateChange={ state =>
                                    MediaViewer.onYTStateChange(state, props)
                                }
                            />
                        );
                        break;
                    }
                    default:
                        throw new Error('Invalid media type ->', props.type);
                }

                cacheMap.set(itemKey, {
                    resource,
                    isMediaLoading: true
                });
            }

            return newState;
        }
        else if(state.updateCount != props.updateCount) {
            return { updateCount: props.updateCount };
        }

        return state;
    }

    render() {
        const { cacheMap } = this.state;

        const {
            type, src, thumb, videoId,
            caption, classes, vpW
        } = this.props;

        const itemKey = MediaViewer.getItemKey(this.props);

        const isMediaLoading = (cacheMap && cacheMap.get(itemKey)) ?
            cacheMap.get(itemKey).isMediaLoading: true;

        const { resource } = cacheMap.get(itemKey);

        const bgLoadingStyle= (isMediaLoading) ? {
            backgroundImage: `url(${resource.thumb})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            filter: 'blur(5px) brightness(50%)',
            transition: 'filter 0.35s, opacity 0.35s'
        }: undefined;

        let mediaElement;

        switch (type) {
            case 'image':
                if(!isMediaLoading) {
                    mediaElement = resource.domSegment;
                }
                else {
                    mediaElement = undefined;
                }
                break;
            case 'video':
                if(!isMediaLoading) {
                    mediaElement = resource.domSegment;
                }
                else {
                    mediaElement = (
                        <ButtonLink
                            url={ resource.url }
                            className={ classes.mediaContainerButton }
                        >{ resource.domSegment }
                        </ButtonLink>
                    );
                }
                break;
        }

        return (
            <div className={ classes.container }>
                <div className={ classes.mediaContainer } style={ bgLoadingStyle }>
                    { mediaElement }
                </div>
                { isMediaLoading && (
                    <div className={ classes.loader }>
                        <CircularProgress
                            color={ 'secondary' }
                            size={ (vpW <= 800) ? 40: 64 }
                        />
                    </div>
                ) }
                <Typography className={ classes.caption } variant={ 'caption' }>
                    { caption }
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(MediaViewer);
