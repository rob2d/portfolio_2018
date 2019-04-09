import React, { memo, PureComponent } from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import LoadingComponent from 'utils/components/LoadingComponent'

const useStyles = makeStyles( theme => ({
    container : {
        display        : 'flex',
        flexDirection  : 'row',
        justifyContent : 'center',
        alignItems     : 'center',
        fontSize       : '13pt',
        width          : '100%',
        textAlign      : 'center',
        marginTop      : '16px',
        color : theme.rc3.text
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
}), { name : 'PDFViewerNav' });

function PDFViewerNav ({
    pageNumber, pageCount,
    handleNextPage, handlePrevPage,
    isLoaded
}) {
    const classes = useStyles();

    return (
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
                    <LoadingComponent />
                </div>
            </div>
        )
    )
}

export default memo(PDFViewerNav)