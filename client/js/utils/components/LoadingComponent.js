import React from 'react'
import injectSheet from 'react-jss'
import CircularProgress from '@material-ui/core/CircularProgress'

const styleSheet = {
    container : {
        position : 'relative',
        display : 'flex',
        flexDirection : 'column',
        width : '100%',
        height : 'auto',
        minHeight : '60px',
        alignItems : 'center',
        justifyContent : 'center',
        paddingTop : '32px',
        paddingBottom : '16px',
        flexGrow : 1
    }
};

function LoadingComponent ({ error, classes, size=64 }) {
    if(error) {
        console.error(error);
        return 'Error Loading!';
    }
    else {
        return (
            <div className={classes.container}>
                <CircularProgress size={size} color='accent' />
            </div>
        );
    }
}

export default injectSheet(styleSheet)(LoadingComponent)