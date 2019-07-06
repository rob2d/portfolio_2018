import React, { useMemo } from 'react'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles( theme => ({
    container : {
        display : 'block'
    },
    button : {
        display    : 'block',
        color      : '#FFF',
        height     : 'auto',
        lineHeight : '24px',
        padding    : '8px',
        minWidth   : '60px'
    },
    buttonIconWrapper : {
        display : 'block'
    },
    buttonIcon : {
        fontSize : '18pt',
        position : 'relative',
        top      : '2px'
    },
    '@media (max-width: 400px)': {
        button : { minWidth : '68px' }
    }
}), 'HeaderSectionButton');

export default function HeaderSectionButton({ 
    onClick, domId, name, 
    iconClass, tooltipText, 
    buttonDivRef, disabled
}){ 
    const classes = useStyles({ 
        onClick, domId, name, iconClass, 
        tooltipText, buttonDivRef, disabled 
    });
    
    return (
        <div 
            ref={ buttonDivRef } 
            className={ classes.container }
        >
            <Tooltip
                enterDelay={ 400 }
                title={ tooltipText }
            >
                <Button className={ classes.button }
                    disabled={ disabled }
                    id={ domId }
                    onMouseDown={ onClick }
                    variant='text'
                >
                    <div className={ classes.buttonIconWrapper }>
                        <i className={ `${iconClass} ${classes.buttonIcon}`} />
                    </div>
                </Button>
            </Tooltip>
        </div>
    )
}