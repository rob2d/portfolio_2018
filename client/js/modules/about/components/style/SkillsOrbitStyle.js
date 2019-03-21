const styles = theme =>({
    container : {
        position       : 'relative',
        display        : 'flex',
        flexDirection  : 'column',
        overflow       : 'hidden',
        justifyContent : 'center',
        alignItems     : 'center',
        pointerEvents  : 'all',
        cursor         : 'pointer'
    },
    meta3d : {
        maxWidth  : '200px',
        maxHeight : '200px',
        overflow  : 'auto'
    },
    hintIcons : {
        position : 'absolute',
        margin   : '0px',
        bottom   : '0px',
        color    : theme.rc3.text
    },
    arrow : {
        '&:before': {
            transition : 'transform ease 0.5s'
        }
    },
    arrowRotated : {
        '&:before': {
            transform : 'rotateZ(180deg)'
        }
    }
});

export default styles