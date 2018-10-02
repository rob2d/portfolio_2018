import React, { PureComponent } from 'react'
import pure from 'recompose/pure'
import Button from '@material-ui/core/Button'
import { cv as strings } from 'strings'
import PDF from 'react-pdf-js'
import Tooltip   from '@material-ui/core/Tooltip'
import shouldShowHoverContent from 'tools/shouldShowHoverContent'
import PDFViewerNav from './PDFViewerNav'
import { withStyles } from '@material-ui/core/styles'

const styleSheet = theme => { 
    return ({
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
            fontSize : '28pt',
            color : theme.rc3.secondaryContrastText
        },
        downloadButtonContainer : {
            position : 'fixed',
            bottom   : '48px',
            right    : '48px'
        },
        downloadButton : {
            backgroundColor : theme.palette.secondary['400'],
            '&:hover' : {
                backgroundColor : theme.palette.secondary['300']
            },
            '&:active' : {
                backgroundColor : theme.palette.secondary['400']
            }
        },
        // TODO : use constant to make
        //        tooltip style DRY
        tooltip : {
            fontSize : '11pt !important',
            padding  : '4px 8px !important',
            minHeight: '20px !important',
            lineHeight: '20px !important'
        },
        loadingContent : {
            display : 'none'
        }

    }
)};

class PDFViewer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            pageNumber : 1, 
            pageCount : 0,
            isLoaded  : false 
        };
    }

    componentDidMount () {
        this.setState({ isLoaded : false });
    }

    componentWillUnmount () {
        this.setState({ isLoaded : false });
    }

    onDocumentComplete = (pageCount)=> {
        this.setState({ 
            pageNumber : 1, 
            pageCount,
            isLoaded : true 
        });
    };

    onPageComplete = (pageNumber)=> {
        this.setState({ pageNumber });
    };

    handlePrevPage = ()=> {
        if(this.state.pageNumber > 1) {
            this.setState({ pageNumber: this.state.pageNumber - 1 });
        }
    };

    handleNextPage = ()=> {
        if(this.state.pageNumber < this.state.pageCount) {
            this.setState({ pageNumber: this.state.pageNumber + 1 });
        }
    };
    render () {
        const { classes, fileURL } = this.props;
        const { 
            pageNumber, 
            pageCount, 
            isLoaded 
        } = this.state;

        return (
            <div className={ classes.container }>
                <div className={!isLoaded ? classes.loadingContent : undefined}>
                    <PDF file={ fileURL }
                        onDocumentComplete={this.onDocumentComplete}
                        onPageComplete={this.onPageComplete}
                        page={pageNumber}
                        className={classes.pdfContent}
                    />
                </div>
                <a
                    href={fileURL}
                    download={'RobertConcepcionResume'}
                    className={classes.downloadButtonContainer}>
                    {shouldShowHoverContent && 
                    (
                        <Tooltip
                            id={`resume-pdf-download-tooltip`}
                            enterDelay={400} 
                            title='Download this PDF'
                            classes={{ tooltip : classes.tooltip }}
                        >
                            <Button
                                variant="fab"
                                data-tip data-for={`resume-pdf-download-tooltip`}
                                className={classes.downloadButton}
                            ><i className={`mdi mdi-download ${classes.downloadIcon}`}/>
                            </Button>
                        </Tooltip>
                    )}
                </a>
                <PDFViewerNav
                    pageNumber={pageNumber}
                    pageCount={pageCount}
                    handleNextPage={this.handleNextPage}
                    handlePrevPage={this.handlePrevPage}
                    isLoaded={isLoaded}
                />
            </div>
        );
    }
}

export default pure(withStyles(styleSheet)(PDFViewer));