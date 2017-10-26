import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import MediaTypes from 'constants/MediaTypes'

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
        overflow : 'hidden',
        maxWidth : ({ maxWidth })=>(maxWidth),
        height : ({ width, maxWidth, aspectRatio })=>(
            // 25% diff to account for reel and status boxes
            Math.round((getWidthUsed(width,maxWidth)/(aspectRatio)) * 0.75) + 'px'
        ),
        margin : '0 auto'
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
    reel : {
        flexBasis : '25%',
        height    : '100%',
        margin : 0,
        padding : 0,
        display : 'flex',
        flexDirection :'row'
    },
    reelThumbs : {
        display : 'flex',
        flexDirection : 'column',
        boxSizing : 'border-box',
        flexBasis : '75%'
    },
    reelThumb : {        
        display : 'block',
        boxSizing : 'border-box',
        width : '100%',
        height : 'auto',
        marginTop : '4px',
        marginBottom : '4px'
    },
    reelThumbVideo : {
        boxSizing : 'border-box',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        border : '2px solid #999',
        minHeight : ({ width, maxWidth, aspectRatio })=>(
            Math.round((getWidthUsed(width,maxWidth)*0.25*0.75) / aspectRatio) + 
                'px !important'
        ),
        marginTop : '4px',
        marginBottom : '4px'
    },
    youtubeThumbIcon : {
        color : '#DD0000',
        fontSize  : '28pt'
    },
    reelPadding : {
        flexBasis : '10%'
    },
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
        justifyContent : 'center'
    },
    statusBoxIcon : {
        fontSize : '10pt'   
    },
    '@media (max-width:400px)' : {
        statusBoxIcon : {
            fontSize : '6pt !important'
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

// for future consideration : add support for > 9 reel items

class MediaReel extends PureComponent {
    constructor (props) {
        super(props);
        this.state = { selectedIndex : 0 };
    }
    itemClicked = (selectedIndex)=> {
        this.setState({ selectedIndex });
    };
    render () {
        const { classes, projectId, media } = this.props;
        const { selectedIndex } = this.state;

        const highlightedMedia = media[selectedIndex];

        return (
            <div className={classes.container}>
                <div className={classes.highlightedMediaSection}>
                {(()=> {
                    switch(highlightedMedia.type) {
                        case MediaTypes.IMAGE : 
                        return (
                            <img 
                                className={classes.highlightedMediaImage} 
                                src={highlightedMedia.src}
                            />
                        );
                        case MediaTypes.VIDEO : 
                    return (<iframe className={classes.highlightedMediaVideo} src={highlightedMedia.src}/>);
                    }
                })()}
                </div>
                <div className={classes.reel}>
                    <div className={classes.reelPadding}>
                    </div>
                    <div className={classes.reelThumbs}>
                        {media.map((item,i)=> {
                            // TODO : forEach vs map several times
                            switch(item.type) {
                                case MediaTypes.IMAGE : 
                                    return (
                                        <img 
                                            className={classes.reelThumb} 
                                            src={item.thumb}
                                            onClick={()=>{this.itemClicked(i)}}
                                        />
                                    );
                                case MediaTypes.VIDEO : 
                                    return (
                                        <div 
                                            className={`${classes.reelThumb} ${classes.reelThumbVideo}`} 
                                            onClick={()=>{this.itemClicked(i)}}
                                        ><i className={`mdi mdi-youtube-play ${classes.youtubeThumbIcon}`}/>
                                        </div>
                                    )
                                default : 
                                    throw new Error(`MediaReel: item # ${i+1} was passed an invalid or non-existent MediaType`);
                            }
                        })}           
                    </div>
                    <div className={classes.reelPadding}>
                    </div>
                    <div className={classes.statusBoxes}>
                    {media.map((item, i)=>(
                         <div className={classes.statusBox} onClick={()=>{this.itemClicked(i)}}>
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