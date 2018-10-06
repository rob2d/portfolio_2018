import React, { PureComponent } from 'react'

const styles = {
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
    video : {
        width   : '100%',
        height : '100%',
        backgroundColor : '#000000'
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
    }
};

class HighlightedMedia extends PureComponent {

    constructor (props) {
        super(props);       
        this.state = { isVideoPlaying : false };
    };

    handleVideoPlay = ()=> {
        this.setState({ isVideoPlaying : true });
    };

    handleVideoStop = () => {
        this.setState({ isVideoPlaying : false });
    };

    /**
     * detects when youtube state changes
     */
    handleYTStateChange = (state)=> {
        if(state && state.data) {
            switch(state.data){
                case 3 :  // 3: buffering; e.g. user clicked
                          // YT vid but hasn't played yet
                    this.setState({ isVideoPlaying : true });
                    break;
            }
        }
    };

    render () {
        const { 
            type, 
            src, 
            videoId 
        } = this.props;

        return (
            <div className={classes.highlightedMediaSection}>

                <div className={classes.mediaCaption}>
                    {caption}
                </div>

                <div className={classes.highlightedMediaLowRes}>
                    {(()=> {
                        switch(type) {
                            case MediaTypes.IMAGE : 
                                return (
                                    <ButtonLink 
                                        url={`${location.protocol}//${location.host}${src}`}
                                        title={ 'Open full res image in new tab' }
                                        containerClass={classes.imageButton}
                                    ><img 
                                        className={classes.image} 
                                        src={src} 
                                    />
                                    </ButtonLink>
                                );
                            case MediaTypes.VIDEO : 
                                return (
                                    <YouTube
                                        videoId={videoId}
                                        className={classes.video}
                                        onPlay={this.handleVideoPlay}
                                        onStop={this.handleVideoStop}
                                        onEnd={this.handleVideoStop}
                                        onStateChange={this.handleYTStateChange}
                                    />
                                );
                        }
                    })()
                }
                </div>
            </div>
        );
    }
}

export default HighlightedMedia