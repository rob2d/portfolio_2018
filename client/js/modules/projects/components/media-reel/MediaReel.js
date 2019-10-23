import React, { PureComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useViewportSizes from 'use-viewport-sizes';
import MediaViewer from './MediaViewer';
import ReelThumbs from './ReelThumbs';
import PropTypes from 'prop-types';
import { Icon } from '@mdi/react';
import {
    mdiSquare,
    mdiSquareOutline
} from '@mdi/js';

// TODO : css related constants should be together
const REEL_ANIM_SPEED = 6500;

/**
 * Retrieves the width for the entire media reel
 * (dependent on width, maxWidth props)
 */
function getReelWidth (width, maxWidth) {
    return maxWidth !== 'undefined' &&
        ((width > maxWidth) ? maxWidth : width);
}

const useStyles = makeStyles( theme => ({
    container : {
        display : 'flex',
        overflow : 'visible',
        maxWidth : p => p.maxWidth,
        height : p => (
            // 25% diff to account for reel and status boxes
            Math.round(
                (getReelWidth(p.width,p.maxWidth)/(p.aspectRatio)) * 0.75
            ) + 'px'
        ),
        margin : '0 auto 56px'
    },
    highlightedImageButton : {
        '&:hover $highlightedMediaImage' : {
            border : '2px solid #c51162'
        },
        '&:active $highlightedMediaImage' : {
            border : '2px solid #00b8d4;'
        }
    },
    highlightedMediaImage : {
        width      : 'auto',
        maxWidth   : '100%',
        height     : 'auto',
        maxHeight  : '10%',
        border     : '2px solid rgba(255,255,255,0)',
        transition : 'border-color 0.24s ease-in'
    },
    highlightedMediaVideo : {
        width  : '100%',
        height : '100%',
        backgroundColor : '#000000'
    },
    reel : {
        flexBasis : '25%',
        height    : '100%',
        margin    : 0,
        padding   : 0,
        display       : 'flex',
        flexDirection :'row'
    },
    reelPadding : {
        flexBasis : '10%'
    },
    statusBoxes : {
        flexBasis  : '5%',
        margin     : 0,
        padding    : 0,
        display    : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection  : 'column'
    },
    statusBox : {
        flexGrow       : 1,
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        cursor         : 'pointer',
        padding        : '0px 12px'
    },
    statusBoxIcon : {
        fontSize : '10pt'
    },
    fullScreenButton : {
        position : 'absolute',
        right    : '16px',
        bottom   : '16px'
    }
}), { name : 'MediaReel' });

class MediaReel extends PureComponent {

    state = {
        selectedIndex : 0,
        isVideoPlaying : false,
        autoplayTimer : null,
        updateCount : 0
    };

    handleItemClick = selectedIndex => {
        this.startReelAutoplay(); // resets autoplay timer
                                  // and binds new interval
        this.setState({ selectedIndex });
    };

    handleVideoPlay = ()=> {
        this.setState({ isVideoPlaying : true });
    };

    handleVideoStop = () => {
        this.setState({ isVideoPlaying : false });
    };

    /**
     * increments update for
     * easily handling media
     * loading (this is somewhat hax;
     * no time to re-write ownership
     * of cache handler for viewer or break
     * down component types)
     */
    handlePropUpdate = () => {
        this.setState({
            updateCount : this.state.updateCount+1
        });
    };

    /**
     * detects when youtube state changes
     */
    handleYTStateChange = state => {
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
        const autoplayTimer = setInterval(()=> { this.autoplayToNextItem(); }, REEL_ANIM_SPEED);
        this.setState({ autoplayTimer, isReelAutoplaying : true});
    };
    autoplayToNextItem = () => {
        if(!this.state.isVideoPlaying) {
            const selectedIndex = (this.state.selectedIndex + 1) %
                                    this.props.media.length;
            this.setState({ selectedIndex });
        }
    };
    render () {
        const {
            classes,
            media,
            width,
            maxWidth,
            aspectRatio,
            vpW,
            vpH
        } = this.props;

        const {
            selectedIndex,
            updateCount
        } = this.state;

        const highlightedMedia = media && media[selectedIndex];

        return (
            <div className={ classes.container }>
                <MediaViewer
                    { ...highlightedMedia }
                    width={ Math.floor(width*0.7) }
                    aspectRatio={ aspectRatio }
                    vpW={ vpW }
                    vpH={ vpH }
                    onVideoPlay={ this.handleVideoPlay }
                    onVideoStop={ this.handleVideoStop }
                    onVideoPause={ undefined } //do not want reel to resume
                    onVideoEnd={ this.handleVideoStop }
                    onUpdate={ this.handlePropUpdate }
                    updateCount={ updateCount }
                />
                <div className={ classes.reel }>
                    <div className={ classes.reelPadding } />
                    {
                        vpW > 740 &&
                        <ReelThumbs
                            media={media}
                            selectedIndex={selectedIndex}
                            thumbHeight ={
                                Math.round((
                                    getReelWidth(width,maxWidth)*0.25*0.75) /
                                    aspectRatio
                                )
                            }
                            onThumbClicked={this.handleItemClick}
                            width={ width }
                            vpH={ vpH }
                        />
                    }
                    <div className={ classes.reelPadding } />
                    <div className={ classes.statusBoxes }>
                    { media.map((item, i)=>(
                        <div
                            key={ `mediaReelItem${i}` }
                            className={ classes.statusBox }
                            onClick={ ()=> this.handleItemClick(i) }
                        >
                        <Icon
                            path={ ( i != selectedIndex )?
                                mdiSquareOutline : mdiSquare
                            }
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
}

MediaReel.propTypes = {
    vpW  : PropTypes.number.isRequired,
    vpH : PropTypes.number.isRequired,
    width : PropTypes.number,
    maxWidth : PropTypes.number,
    aspectRatio : PropTypes.number.isRequired,
    projectId : PropTypes.string.isRequired,
    media : PropTypes.shape({
        type : PropTypes.string.isRequired,
        src : PropTypes.string,
        thumb : PropTypes.string,
        videoId : PropTypes.string
    })
};

// TODO : convert MediaViewer to hooks implementation
// and do not rely on requiring a container

export default function MediaReelContainer(props) {
    const [vpW, vpH] = useViewportSizes();
    const classes = useStyles({ ...props, vpW, vpH });

    return (
        <MediaReel
            { ...props }
            classes={ classes }
            vpW={ vpW }
            vpH={ vpH }
        />
    );
}