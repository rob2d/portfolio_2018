import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import MediaTypes from 'constants/MediaTypes'
import Tooltip from '@material-ui/core/Tooltip'
import shouldShowHoverContent from 'tools/shouldShowHoverContent'

const styleSheet = {
    reelThumbImg : {        
        display : 'block',
        boxSizing : 'border-box',
        width : '100%',
        height : 'auto'
    },
    reelThumbSelected : {
        border : '2px solid rgb(0,175,200) !important'
    },
    reelThumbContainer : {
        position: 'relative',
        left : 0,
        top  : 0,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        boxSizing   : 'border-box',
        border       : '2px solid rgba(0,0,0,0)',
        width        : '100%',
        minHeight    : ({ thumbHeight })=>(`${thumbHeight}px !important`),
        height       : ({ thumbHeight })=>(`${thumbHeight}px !important`),
        marginTop    : '4px',
        marginBottom : '4px',
        cursor       : 'pointer'
    },
    reelThumbSelectedOverlay : {
        position : 'absolute',
        left : '0',
        top : '0',
        width : '100%',
        height: '100%',
        pointerEvents : 'none',
        backgroundColor : 'rgba(0,175,200,0.5)',
        zIndex : 1
    },
    youtubeThumbIcon : {
        color : '#DD0000',
        fontSize  : '28pt',
        width : '100%',
        height : '100%',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    }
};

const ReelThumb = injectSheet(styleSheet)(
    function ReelThumb ({ 
        onClick,  isSelected, thumbHeight, item, classes
    }) {
        return (
                <div className={`${classes.reelThumbContainer} ${
                    isSelected?classes.reelThumbSelected:''}`}
                    onClick={onClick}
                > {/* selected overlay if applicable */}
                { isSelected && 
                    (<div className={classes.reelThumbSelectedOverlay}></div>)
                }
                { (item.type == MediaTypes.IMAGE) && 
                    (<img className={`${classes.reelThumbImg}`} src={item.thumb}/>)
                }
                { (item.type == MediaTypes.VIDEO) && 
                    (<i className={`mdi mdi-youtube-play ${classes.youtubeThumbIcon}`}/>)
                }
                </div>
        );
    }
);

// Optimization : break further down into individual ReelThumb components
class ReelThumbs extends PureComponent {
    constructor(props) {
        super(props);
        this.R = { container : undefined, reelThumbs : [] };
    }
    componentDidUpdate(prevProps, prevState) {
        const { selectedIndex, thumbHeight } = this.props;
        if(selectedIndex != prevProps.selectedIndex && this.R.container) {
            this.R.container.scrollTop = (thumbHeight+8)*selectedIndex;
        }
    }
    render () {
        const { 
            selectedIndex, media, 
            thumbHeight, classes
        } = this.props;
        const thumbSet = [];

        for(let i = 0; i < media.length; i++) {
                const onClick = ()=>{ 
                    this.props.onThumbClicked(i);
                    // TODO : scroll smoothly
                   
                };

                thumbSet.push(   
                    <ReelThumb 
                        key={`reelThumbsSetItem${i}`}
                        onClick={onClick} 
                        thumbHeight={thumbHeight}
                        item={media[i]}
                        isSelected={selectedIndex == i}
                        media={media}
                    />
                );
        }

        
        return ( 
        <div className={classes.reelThumbs} ref={(c) => this.R.container = c}>
            {thumbSet}
        </div>);
    }
}

export default injectSheet({  reelThumbs : {
    position : 'relative',
    display : 'flex',
    flexDirection : 'column',
    boxSizing : 'border-box',
    flexBasis : '75%',
    overflowY : 'scroll',
    overflowX : 'hidden',
    scrollBehavior : 'smooth', // works with polyfill
    '&::-webkit-scrollbar': {
        display : 'none'
    }
}})(ReelThumbs)