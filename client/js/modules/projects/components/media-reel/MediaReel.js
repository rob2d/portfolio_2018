import { PureComponent, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import useViewportSizes from 'use-viewport-sizes';
import { Icon } from '@mdi/react';
import { mdiSquare, mdiSquareOutline } from '@mdi/js';
import MediaViewer from './MediaViewer';
import ReelThumbs from './ReelThumbs';

const PREFIX = 'MediaReel';

const classes = {
    container: `${PREFIX}-container`,
    highlightedImageButton: `${PREFIX}-highlightedImageButton`,
    highlightedMediaImage: `${PREFIX}-highlightedMediaImage`,
    highlightedMediaVideo: `${PREFIX}-highlightedMediaVideo`,
    reel: `${PREFIX}-reel`,
    reelPadding: `${PREFIX}-reelPadding`,
    statusBoxes: `${PREFIX}-statusBoxes`,
    statusBox: `${PREFIX}-statusBox`,
    statusBoxIcon: `${PREFIX}-statusBoxIcon`,
    fullScreenButton: `${PREFIX}-fullScreenButton`
};

// TODO : css related constants should be together
const REEL_ANIM_SPEED = 6500;

/**
 * Retrieves the width for the entire media reel
 * (dependent on width, maxWidth props)
 */
function getReelWidth(width, maxWidth) {
    return maxWidth !== 'undefined' &&
        ((width > maxWidth) ? maxWidth : width);
}

class MediaReel extends PureComponent {

    state = {
        selectedIndex: 0,
        isVideoPlaying: false,
        autoplayTimer: null,
        updateCount: 0
    };

    componentDidMount() {
        this.startReelAutoplay();
    }

    componentWillUnmount() {
        const { autoplayTimer } = this.state;
        clearInterval(autoplayTimer);
    }

    handleVideoPlay = () => {
        this.setState({ isVideoPlaying: true });
    };

    handleVideoStop = () => {
        this.setState({ isVideoPlaying: false });
    };

    handleItemClick = selectedIndex => {
        // reset autoplay timer
        // and bind new interval
        this.startReelAutoplay();
        this.setState({ selectedIndex });
    };

    /**
     * increments update for easily handling media loading
     * (this is somewhat hax; no time to re-write ownership
     * of cache handler for viewer or break down component types)
     */
    handlePropUpdate = () => {
        const { updateCount } = this.state;
        this.setState({ updateCount: updateCount + 1 });
    };

    startReelAutoplay = () => {
        const { autoplayTimer } = this.state;
        clearInterval(autoplayTimer);
        this.setState({
            autoplayTimer: setInterval(() => this.autoplayToNextItem(), REEL_ANIM_SPEED),
        });
    };

    autoplayToNextItem = () => {
        const { isVideoPlaying, selectedIndex } = this.state;
        const { media } = this.props;
        if(!isVideoPlaying) {
            this.setState({ selectedIndex: (selectedIndex + 1) % media.length });
        }
    };

    render() {
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
                        vpW > 740 && (
                            <ReelThumbs
                                media={ media }
                                selectedIndex={ selectedIndex }
                                thumbHeight={
                                    Math.round((
                                        getReelWidth(width,maxWidth)*0.25*0.75) /
                                        aspectRatio
                                    )
                                }
                                onThumbClicked={ this.handleItemClick }
                                width={ width }
                                vpH={ vpH }
                            />
                    ) }
                    <div className={ classes.reelPadding } />
                    <div className={ classes.statusBoxes }>
                        { media.map((item, i) => (
                            <div
                                key={ `mediaReelItem${i}` }
                                className={ classes.statusBox }
                                onKeyDown={ e => {
                                    if(e.keyCode === 13) {
                                        this.handleItemClick(i);
                                    }
                                } }
                                onClick={ () => this.handleItemClick(i) }
                            >
                                <Icon
                                    path={ ( i != selectedIndex ) ?
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

const StyledMediaReel =
 styled(MediaReel
 )(() => ({
     [`& .${classes.container}`]: {
         display: 'flex',
         overflow: 'visible',
         maxWidth: p => p.maxWidth,
         height: p => (
             // 25% diff to account for reel and status boxes
             `${Math.round(
                 (getReelWidth(p.width,p.maxWidth)/(p.aspectRatio)) * 0.75
             )}px`
         ),
         margin: '0 auto 56px'
     },

     [`& .${classes.highlightedImageButton}`]: {
         '&:hover $highlightedMediaImage': {
             border: '2px solid #c51162'
         },
         '&:active $highlightedMediaImage': {
             border: '2px solid #00b8d4;'
         }
     },

     [`& .${classes.highlightedMediaImage}`]: {
         width: 'auto',
         maxWidth: '100%',
         height: 'auto',
         maxHeight: '10%',
         border: '2px solid rgba(255,255,255,0)',
         transition: 'border-color 0.24s ease-in'
     },

     [`& .${classes.highlightedMediaVideo}`]: {
         width: '100%',
         height: '100%',
         backgroundColor: '#000000'
     },

     [`& .${classes.reel}`]: {
         flexBasis: '25%',
         height: '100%',
         margin: 0,
         padding: 0,
         display: 'flex',
         flexDirection: 'row'
     },

     [`& .${classes.reelPadding}`]: {
         flexBasis: '10%'
     },

     [`& .${classes.statusBoxes}`]: {
         flexBasis: '5%',
         margin: 0,
         padding: 0,
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         flexDirection: 'column'
     },

     [`& .${classes.statusBox}`]: {
         flexGrow: 1,
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         cursor: 'pointer',
         padding: '0px 12px'
     },

     [`& .${classes.statusBoxIcon}`]: {
         fontSize: '10pt'
     },

     [`& .${classes.fullScreenButton}`]: {
         position: 'absolute',
         right: '16px',
         bottom: '16px'
     }
 }));

// TODO : convert MediaViewer to hooks implementation
// and do not rely on requiring a container

export default function MediaReelContainer(props) {
    const [vpW, vpH] = useViewportSizes();

    return (
        <MediaReel
            { ...props }
            classes={ classes }
            vpW={ vpW }
            vpH={ vpH }
        />
    );
}
