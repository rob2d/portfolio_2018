import React, { memo, useMemo, useEffect, useState, useReducer } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import PDF from 'react-pdf-js'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/fab'
import shouldShowHoverContent from 'utils/shouldShowHoverContent'
import PDFViewerNav from './PDFViewerNav'
import Themes from 'constants/Themes'

const useStyles = makeStyles(({ palette, rc3 }) => ({ 
    container : {
        position       : 'relative',
        display        : 'flex',
        flexDirection  : 'column',
        width          : '100%',
        height         : 'auto',
        minHeight      : '60px',
        alignItems     : 'center',
        justifyContent : 'center',
        paddingTop     : '32px',
        paddingBottom  : '16px'
    },
    pdfContent : {
        display  : 'inline-block',
        padding  : 0,
        margin   : 0,
        filter : ((palette.type == Themes.LIGHT) ? 
            'none' : 'invert(100%)'
        ),

        // resize pdf height according to 8.5x11
        
        '@media (max-width: 900px)': {
            maxWidth : '100%',
            height : 'auto !important'
        },
        '@media (min-width: 900px)': {
            width    : '100%',
            maxWidth : '800px',
            height   : 'auto !important'
        }
    },
    downloadP : {
        paddingLeft: '12px',
        paddingBottom: '12px',
        paddingTop: '12px'
    },
    downloadIcon : {
        fontSize : '24pt',
        color : rc3.secondaryContrastText
    },
    downloadButtonContainer : {
        position : 'fixed',
        bottom   : '48px',
        right    : '48px',
        '@media (max-width: 800px)': {
            bottom   : '24px !important',
            right    : '24px !important',
        }
    },
    downloadButton : {
        backgroundColor : palette.secondary['400'],
        '&:hover' : {
            backgroundColor : palette.secondary['300']
        },
        '&:active' : {
            backgroundColor : palette.secondary['400']
        }
    },
    loadingContent : {
        display : 'none'
    }
}), { name : 'PDFViewer' });

const initialState = {
    pagenumber : 1,
    pageCount : 0,
    isLoaded : false,
    isRetriggering : false
};

function reducer (state={ initialState }, action) {
    console.trace('action ->', action);
    const { type, payload } = action;

    switch(type) {
        case 'go-to-next-page': {
            return { ...state, pageNumber : (state.pageNumber + 1) };
        }
        case 'go-to-prev-page': {
            return { ...state, pageNumber : (state.pageNumber - 1) };
        }
        case 'retrigger-view': {
            return { ...state, isRetriggering : true };
        }
        case 'reset-retrigger': {
            return { ...state, isRetriggering : false };
        }
        case 'load-content' : {
            return { ...state, isLoaded : true };
        }
        case 'unload-content' : {
            return { ...state, isLoaded : false };
        }
        case 'handle-document-complete' : {
            return { ...state, 
                pageCount : payload,
                pageNumber : 1,
                isLoaded : true 
            };
        }
        default : {
            return state;
        }
    }
}

function PDFViewer ({ fileURL }) {
    const classes = useStyles();
    const theme = useTheme();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(()=> {
        dispatch({ type : 'retrigger-view' });
    }, [theme.palette.type]);

    useEffect(()=> {
        if(state.isRetriggering) {
            dispatch({ type : 'reset-retrigger' });
        }
    }, [state.isRetriggering]);

    const handlePrevPage = useMemo(()=> ()=> {
        (state.pageNumber > 1 && 
            dispatch({ type : 'go-to-prev-page' }));
    }, [state.pageNumber]);

    const handleNextPage = useMemo(()=> ()=>{
        (state.pageNumber < state.pageCount) && 
        dispatch({ type : 'go-to-next-page' })
    }, [state.pageNumber, state.pageCount]);

    const onPageComplete = useMemo(()=> 
        pageNumber => dispatch({ 
            type : 'handle-page-complete', 
            payload : pageNumber 
        }), 
    []);

    const onDocumentComplete = useMemo(()=> 
        pageCount => dispatch({ 
            type : 'handle-document-complete',
            payload : pageCount
        }), []);

    console.log('rendering 🙂🙏🙏🙏')

    return (
        <div className={ classes.container }>
            <div className={!state.isLoaded ? classes.loadingContent : undefined}>
                <PDF file={ !state.isRetriggering && fileURL }
                    onDocumentComplete={ onDocumentComplete }
                    onPageComplete={ onPageComplete }
                    page={ state.pageNumber }
                    className={ classes.pdfContent }
                />
            </div>
            <a
                href={fileURL}
                download={'RobertConcepcionResume'}
                className={classes.downloadButtonContainer}>
                { shouldShowHoverContent ? 
                (
                    <Tooltip
                        id={`resume-pdf-download-tooltip`}
                        enterDelay={400} 
                        title='Download this PDF'
                        classes={{ tooltip : classes.tooltip }}
                    >
                        <Fab className={classes.downloadButton}>
                            <i className={`mdi mdi-download ${classes.downloadIcon}`}/>
                        </Fab>
                    </Tooltip>
                ) : (<Button
                        variant="fab"
                        data-tip data-for={`resume-pdf-download-tooltip`}
                        className={classes.downloadButton}
                    ><i className={`mdi mdi-download ${classes.downloadIcon}`}/>
                </Button>
                )}
            </a>
            <PDFViewerNav
                pageNumber={ state.pageNumber }
                pageCount={ state.pageCount }
                handleNextPage={ handleNextPage }
                handlePrevPage={ handlePrevPage }
                isLoaded={ state.isLoaded }
                theme={ theme }
            />
        </div>
    );
}

export default memo(PDFViewer);