import React, { memo, useMemo, useEffect, useState, } from 'react'
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

function PDFViewer ({ fileURL }) {
    const classes = useStyles();
    const { theme } = useTheme();
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isRetriggering, setIsRetriggering] = useState(false);

    useEffect(()=> {
        setIsLoaded(false); 
        return ()=> setIsLoaded(false);
    }, []);

    useEffect(()=> {
        if(isRetriggering) {
            setIsRetriggering(false);
        }
    }, [isRetriggering])

    const handlePrevPage = useMemo(()=> {
        (pageNumber > 1 && setPageNumber(pageNumber-1));
    }, []);

    const handleNextPage = useMemo(()=> {
        (pageNumber < pageCount) && setPageNumber(pageNumber+1)
    }, []);

    const onPageComplete = useMemo(()=> setPageNumber, []);

    const onDocumentComplete = useMemo(()=> pageCount => {
        setPageCount(pageCount);
        setPageNumber(1);
        setIsLoaded(true);
    }, []);

    return (
        <div className={ classes.container }>
            <div className={!isLoaded ? classes.loadingContent : undefined}>
                <PDF file={ !isRetriggering && fileURL }
                    onDocumentComplete={onDocumentComplete}
                    onPageComplete={onPageComplete}
                    page={pageNumber}
                    className={classes.pdfContent}
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
                pageNumber={ pageNumber }
                pageCount={ pageCount }
                handleNextPage={ handleNextPage }
                handlePrevPage={ handlePrevPage }
                isLoaded={ isLoaded }
                theme={ theme }
            />
        </div>
    );
}

export default memo(PDFViewer);