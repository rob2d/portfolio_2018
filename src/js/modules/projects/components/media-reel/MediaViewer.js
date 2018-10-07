import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import MediaTypes from 'constants/MediaTypes'
import ButtonLink from 'tools/components/ButtonLink'
import YouTube from 'react-youtube'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'

const styleSheet = {
    container : {
        display         : 'flex',
        boxSizing       : 'border-box',
        justifyContent  : 'center',
        alignItems      : 'center',
        position        : 'relative',
        flexBasis       : '75%',
        height          : '100%',
        margin          : 0,
        padding         : 0
    },
    imageButton : {
        '&:hover $image' : {
            border : '2px solid #c51162'
        },
        '&:active $image' : {
            border : '2px solid #00b8d4;'
        }
    },
    image : {
        width      : 'auto',
        maxWidth   : '100%',
        height     : 'auto',
        maxHeight  : '100%',
        border     : '2px solid rgba(255,255,255,0)',
        transition : 'border-color 0.24s ease-in'
    },
    mediaContainer : {
        width   : '100%',
        height  : '100%'
    },
    caption : {
        display : 'flex',
        minHeight : '48px',
        justifyContent : 'center',
        alignItems : 'center',
        width : '100%',
        position : 'absolute',
        bottom : '-48px',
        textAlign : 'center',
    },
    loader : {
        position : 'absolute',
        display  : 'flex',
        pointerEvents : 'none',
        justifyContent : 'center',
        alignItems     : 'center',
        top      : '0',
        left     : '0',
        width    : '100%',
        height   : '100%',
        right    : '0',
        bottom   : '0',
        zIndex   : '1000'
    }
};

class MediaViewer extends PureComponent {

    constructor(props) {
        super(props);

        const { disableCache } = props;

        this.state = { 
            cacheMap : disableCache ? undefined : new Map() 
        };
    }

    /**
     * detects when youtube state changes
     */
    static onYTStateChange = (state, props) => {
        if(state && state.data) {
            switch(state.data){
                case 3 :  // 3: buffering; e.g. user clicked
                          // YT vid but hasn't played yet
                    props.onVideoPlay();
                    break;
            }
        }
    };

    static getItemKey (props) {
        const { type, src, videoId } = props;

        switch(props.type) {
            case MediaTypes.IMAGE : 
                return `${type}_${src}`;
            case MediaTypes.VIDEO : 
                return `${type}_${videoId}`
            default : 
                throw new Error('Invalid Media Type');
        }
    }

    static getDerivedStateFromProps(props, state) {
        
        // when a prop related to resources change,
        // our isMediaLoading state should
        // reset to true (and update trailing props
        // which allow us to re-flag)

        if(((props.type    != state.type)    || 
           (props.src     != state.src)     ||
           (props.videoId != state.videoId))
        ) {

            let newState = {
                type        : state.src,
                src         : props.src,
                videoId     : props.videoId,
                updateCount : props.updateCount
            };

            const { cacheMap } = state;
            let itemKey = MediaViewer.getItemKey(props);

            if(cacheMap && cacheMap.has(itemKey)) {
                let { resource, isMediaLoading } = cacheMap.get(itemKey);
                switch(props.type) {
                    case MediaTypes.VIDEO : 
                        // TODO : we should be saving
                        //        video element so that
                        //        it does not need to
                        //        reload iFrame
                        if(props.updateCount == state.updateCount) {
                            cacheMap.get(itemKey).isMediaLoading = true;
                        }
                        break;
                }
            } else {
                let resource = {
                    isMediaLoading : true,
                    domSegment     : undefined // assigned below
                };

                switch(props.type) {
                    case MediaTypes.IMAGE : 
                        resource.img = new Image();
                        resource.img.src = props.src;
                        resource.img.onload = ()=> {
                            cacheMap.get(itemKey).isMediaLoading = false;
                            props.onUpdate();
                        };

                        resource.domSegment =  (
                            <ButtonLink 
                                url={`${location.protocol}//${location.host}${props.src}`}
                                title={ 'Open full res image in new tab' }
                                containerClass={props.classes.imageButton}
                            > <img 
                                className={props.classes.image} 
                                src={props.src} 
                            />
                            </ButtonLink>
                        );
                        break;
                    case MediaTypes.VIDEO : 

                        const {
                            onVideoPlay,
                            onVideoStop,
                            onVideoPause,
                            onVideoEnd
                        } = props;
                        
                        resource.domSegment = (
                            <YouTube
                                key={itemKey}
                                id={itemKey}
                                videoId={props.videoId}
                                className={props.classes.mediaContainer}
                                onReady={() => {
                                    let thisItem = cacheMap.get(itemKey);
                                    thisItem.isMediaLoading = false;
                                    props.onUpdate();
                                }}
                                onPlay={props.onVideoPlay}
                                onStop={props.onVideoStop}
                                onEnd={props.onVideoEnd}
                                onPause={props.onVideoPause} 
                                onStateChange={ state =>
                                    MediaViewer.onYTStateChange(state, props)
                                }
                            />
                        );
                        break;
                    default : 
                        throw new Error('Invalid media type ->', props.type);
                }


                cacheMap.set(itemKey, {
                    resource,
                    isMediaLoading : true
                });
            }

            return newState;
        } else {
            if(state.updateCount != props.updateCount) {
                return { updateCount : props.updateCount }
            } else {
                return null;
            }
        }
    }

    render () {
        const { cacheMap } = this.state;

        const { 
            type, src, thumb, videoId, 
            caption, classes
        } = this.props;

        const itemKey = MediaViewer.getItemKey(this.props);

        const isMediaLoading = (cacheMap && cacheMap.get(itemKey)) ? 
                                    cacheMap.get(itemKey).isMediaLoading : true;

        let bgLoadingStyle= (isMediaLoading && type == MediaTypes.IMAGE) ? {
            backgroundImage  : `url(${thumb})`,
            backgroundRepeat : 'no-repeat',
            backgroundSize   : 'contain',
            backgroundPosition : 'center',
            filter : 'blur(10px) brightness(50%)',
            transition : 'filter 0.35s'
        }: undefined;

        let mediaElement;

        switch(type) {
            case MediaTypes.IMAGE : 
                if(cacheMap.get(itemKey) && (!cacheMap.get(itemKey).isMediaLoading)) {
                    mediaElement = cacheMap.get(itemKey).resource.domSegment;
                } else {
                    mediaElement = undefined;
                }
                break;
            case MediaTypes.VIDEO : 
                mediaElement =  cacheMap.get(itemKey).resource.domSegment;
                break;
        }

        return (
            <div className={classes.container}> 
                <div className={classes.mediaContainer} style={bgLoadingStyle}>
                    { mediaElement }
                </div>
                {isMediaLoading &&
                (<div className={classes.loader}>
                    <CircularProgress size={64} color="accent" />
                </div>)}
                <div className={classes.caption}>
                    {caption}
                </div>
            </div>
        );
    }
}

MediaViewer.propTypes = {
    type         : PropTypes.string.isRequired,
    src          : PropTypes.string,
    thumb        : PropTypes.string,
    videoId      : PropTypes.string,
    onVideoPlay  : PropTypes.func.isRequired,
    onVideoStop  : PropTypes.func.isRequired,
    disableCache : PropTypes.bool
};

export default injectSheet(styleSheet)(MediaViewer)