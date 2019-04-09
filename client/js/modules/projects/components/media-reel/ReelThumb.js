import React, { memo } from 'react'
import { makeStyles } from '@material-ui/styles'
import MediaTypes from 'constants/MediaTypes'

const useStyles = makeStyles( theme => ({
    reelThumbImg : {        
        display   : 'block',
        boxSizing : 'border-box',
        width     : '100%',
        height    : '100%'
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
        backgroundColor : '#FFFFFF',
        fontSize  : '28pt',
        width : '100%',
        height : '100%',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    }
}), { name : 'ReelThumb' });

const ReelThumb = memo(function ReelThumb ({ onClick,  isSelected, thumbHeight, item }) {
    const classes = useStyles({ thumbHeight });

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
            (<i className={`mdi mdi-youtube ${classes.youtubeThumbIcon}`}/>)
        }
        </div>
    );
});

export default ReelThumb
