import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import MediaTypes from 'constants/MediaTypes'
import ReelThumbs from './ReelThumbs'
import { connect } from 'react-redux'
import YouTube from 'react-youtube'

// TODO : css related constants should be in
//        one place
const REEL_ANIM_SPEED = 40;

/**
 * Retrieves the width for the entire media reel
 * (dependent on maxWidth, width props)
 */
function getWidthUsed ( width, maxWidth ) {
    return maxWidth !== 'undefined' && 
        ((width > maxWidth) ? maxWidth : width);
}

const styleSheet = {
    container : {
        display : 'flex',
        overflow : 'visible',
        maxWidth : ({ maxWidth })=>(maxWidth),
        height : ({ width, maxWidth, aspectRatio })=>(
            // 25% diff to account for reel and status boxes
            Math.round((getWidthUsed(width,maxWidth)/(aspectRatio)) * 0.75) + 'px'
        ),
        margin : '0 auto 56px'
    },
    highlightedMediaSection : {
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
    highlightedMediaImage : {
        width : 'auto',
        maxWidth : '100%',
        height : 'auto',
        maxHeight : '100%'
    },
    highlightedMediaVideo : {
        width : '100%',
        height: '100%'
    },
    mediaCaption : {
        display : 'flex',
        minHeight : '48px',
        justifyContent : 'center',
        alignItems : 'center',
        width : '100%',
        position : 'absolute',
        bottom : '-48px',
        textAlign : 'center',
    },
    reel : {
        flexBasis : '25%',
        height    : '100%',
        margin : 0,
        padding : 0,
        display : 'flex',
        flexDirection :'row'
    },
    reelPadding : { flexBasis : '10%' },
    statusBoxes : {
        flexBasis : '5%',
        margin : 0,
        padding : 0,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'column'
    },
    statusBox : {
        flexGrow : 1,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        cursor : 'pointer'
    },
    statusBoxIcon : {
        fontSize : '10pt'
    },
    '@media (max-width:400px)' : {
        statusBoxIcon : {
            fontSize : '6pt !important'
        },
        mediaCaption : {
            fontSize : '11pt'
        }
    },
    mediaButton :  {
        color : '#FFFFFF',
        fontSize : '24pt'
    },
    fullScreenButton : {
        position : 'absolute',
        right : '16px',
        bottom : '16px'
    }
};

class MediaReel extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            selectedIndex : 0,
            isVideoPlaying : false,
            autoplayTimer : null
         };
    }
    handleItemClick = (selectedIndex)=> {
        this.startReelAutoplay(); // resets autoplay timer
                                  // and binds new interval
        this.setState({ selectedIndex });
    };
    handleVideoPlay = ()=> {
        console.log('handleVideoPlay()');
        this.setState({ isVideoPlaying : true });
    };
    handleVideoStop = () => {
        console.log('handleVideoStop()');
        this.setState({ isVideoPlaying : false });
    };
    /**
     * detects when youtube state changes
     */
    handleYTStateChange = (state)=> {
        if(state && state.data) {
            switch(state.data){
                case 3 :    // 3: buffering; e.g. user clicked
                            // YT vid but hasn't played yet
                    this.setState({ isVideoPlaying : true });
                    break;
            }
        }
    };
    componentDidMount () {
        this.startReelAutoplay();
    }
    componentWillUnmount() {
        clearInterval(this.state.autoplayTimer);
    }
    // also restarts autoplay
    startReelAutoplay = () => {
        if(this.state.autoplayTimer) {
            (this.state.selectedIndex + 1) % this.props.media.length
        }
        clearInterval(this.state.autoplayTimer);
        const autoplayTimer = setInterval(()=> { this.autoplayToNextItem(); }, 4000);
        this.setState({ autoplayTimer, isReelAutoplaying : true});
    };
    autoplayToNextItem = () => {
        if(!this.state.isVideoPlaying) {
            const selectedIndex = (this.state.selectedIndex + 1) % this.props.media.length;
            this.setState({ selectedIndex });
        }
    };
    render () {
        const { classes, media, projectId, width, maxWidth, aspectRatio } = this.props;
        const { selectedIndex, iterationIndex, advanceInitialThumbs } = this.state;

        const highlightedMedia = media && media[selectedIndex];

        return (
            <div className={classes.container}>
                <div className={classes.highlightedMediaSection}>
                {highlightedMedia && highlightedMedia.caption && (
                    <div className={classes.mediaCaption}>
                        {highlightedMedia.caption}
                    </div>
                )}
                <div className={classes.highlightedMediaLowRes}></div>
                {(()=> {
                    if(!highlightedMedia) {
                        return null;
                    }

                    switch(highlightedMedia.type) {
                        case MediaTypes.IMAGE : 
                        return (
                            <img 
                                className={classes.highlightedMediaImage} 
                                src={highlightedMedia.src}
                            />
                        );
                        case MediaTypes.VIDEO : 
                    return ( highlightedMedia && (
                        <div className={classes.highlightedMediaVideo}>
                            <YouTube
                                videoId={highlightedMedia.videoId}
                                className={classes.highlightedMediaVideo}
                                onPlay={this.handleVideoPlay}
                                onStop={this.handleVideoStop}
                                onEnd={this.handleVideoStop}
                                onStateChange={this.handleYTStateChange}
                            />
                        </div>
                    ))
                    }
                })()}
                </div>
                <div className={classes.reel}>
                    <div className={classes.reelPadding}></div>
                    <ReelThumbs 
                        media={media}
                        selectedIndex={selectedIndex}
                        thumbHeight ={
                            Math.round((
                                getWidthUsed(width,maxWidth)*0.25*0.75) / aspectRatio
                            )
                        }
                        onThumbClicked={this.handleItemClick}
                        width={width}
                    />
                    <div className={classes.reelPadding}>
                    </div>
                    <div className={classes.statusBoxes}>
                    {media.map((item, i)=>(
                         <div 
                            className={classes.statusBox} 
                            onClick={()=>this.handleItemClick(i)}
                        >
                            <i className={`mdi mdi-square${ 
                                i!=selectedIndex ? '-outline':'' } ${
                                classes.statusBoxIcon}`} 
                            />
                         </div>
                    ))}
                </div>       
                </div>
            </div>
            );
    }
}

export default injectSheet(styleSheet)(MediaReel)