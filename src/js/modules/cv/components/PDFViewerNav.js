import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { cv as strings } from 'strings'
import CircularProgress from '@material-ui/core/CircularProgress'

const styleSheet = (theme)=> ({
    container : {
        display        : 'flex',
        flexDirection  : 'row',
        justifyContent : 'center',
        alignItems     : 'center',
        fontSize       : '13pt',
        width          : '100%',
        textAlign      : 'center',
        marginTop      : '16px'
    },
    progress : {
        display : 'block',
        height : 'auto'
    },
    buttonContainer : {
        position       : 'relative',
        display        : 'inline-flex',
        justifyContent : 'center',
        height         : '100%'
    },
    prevButton : {
        alignItems : 'flex-end'
    },
    nextButton : {
        alignItems : 'flex-start'
    },
    button : {
        fontSize : '17pt',
        minWidth : '48px'
    }
});

const PDFNav = pure(withStyles(styleSheet)(({
    classes,
    pageNumber, pageCount,
    handleNextPage, handlePrevPage,
    isLoaded
})=>
(
    isLoaded ? 
    (
        <div className={classes.container}>
            <div className={`${classes.buttonContainer} ${classes.prevButton}`}>
                <Button
                    className={classes.button}
                    disabled={ !(pageNumber > 1) }
                    onClick={ handlePrevPage }
                ><i className={`mdi mdi-skip-previous`}/>
                </Button>
            </div>
            { 
                ( pageCount > 0 ) &&
                    (<div>{pageNumber}&nbsp;/&nbsp;{pageCount}</div>)
            }
            <div className={`${classes.buttonContainer} ${classes.nextButton}`}>
                <Button
                    className={classes.button}
                    disabled={ !(pageNumber < pageCount) }
                    onClick={ handleNextPage }
                ><i className={`mdi mdi-skip-next`}/>
                </Button>
            </div>
        </div>
    ) : (
        <div className={classes.container}>
            <div className={classes.linearProgress}>
                <CircularProgress color="accent" size={64} />
            </div>
        </div>
    )
)));;;

export default PDFNav