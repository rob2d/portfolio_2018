import React, { memo } from 'react'
import injectSheet from 'react-jss'
import { makeStyles } from '@material-ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles( theme => ({
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
}), 'LoadingComponent');

function LoadingComponent ({ error, size=64 }) {
    const classes = useStyles({ error, size });

    if(error) {
        console.error(error);
        return 'Error Loading!';
    }
    else {
        return (
            <div className={ classes.container }>
                <CircularProgress 
                    size={ size } 
                    color='accent' 
                />
            </div>
        );
    }
}

export default memo(LoadingComponent)