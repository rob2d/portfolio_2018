import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import { cv as strings } from 'strings'
import PDF from 'react-pdf-js';
import Tooltip   from 'react-tooltip'
import shouldShowHoverContent from 'tools/shouldShowHoverContent'
import PDFViewerNav from './PDFViewerNav'

const styleSheet = (theme) =>
({
    container :
    {
        position       : 'relative',
        display        : 'flex',
        flexDirection  : 'column',
        width          : '100%',
        height         : 'auto',
        minHeight      : '60px',
        alignItems     : 'center',
        justifyContent : 'center',
        paddingTop     : '16px',
        paddingBottom  : '16px'
    },
    pdfContent :
    {
        display  : 'inline-block',
        padding  : 0,
        margin   : 0,
        // resize pdf height according to 8.5x11
        '@media (max-width: 900px)':
        {
            maxWidth : '100%',
            height : 'auto !important'
        },
        '@media (min-width: 900px)':
        {
            width    : '100%',
            maxWidth : '800px',
            height   : 'auto !important'
        }
    },
    downloadP :
    {
        paddingLeft: '12px',
        paddingBottom: '12px',
        paddingTop: '12px'
    },
    downloadIcon :
    {
        fontSize : '28pt'
    },
    downloadButton :
    {
    },
    downloadButtonContainer :
    {
        position : 'fixed',
        bottom   : '48px',
        right    : '48px',
    }
});

class PDFViewer extends PureComponent
{
    constructor(props)
    {
        super(props);
        this.state = { pageNumber : 1, pageCount : 0 };
    }
    onDocumentComplete = (pageCount)=> {
        console.log('onDocumentComplete ->', pageCount);
        this.setState({ pageNumber : 1, pageCount });
    };

    onPageComplete = (pageNumber)=> {
        console.log('onPageComplete ->', pageNumber);
        this.setState({ pageNumber });
    };

    handlePrevPage = ()=> {
        if(this.state.pageNumber > 1)
        {
            this.setState({ pageNumber: this.state.pageNumber - 1 });
        }
    };

    handleNextPage = ()=> {
        if(this.state.pageNumber < this.state.pageCount)
        {
            this.setState({ pageNumber: this.state.pageNumber + 1 });
        }
    };
    render ()
    {
        const { classes, fileURL } = this.props;
        const { pageNumber, pageCount } = this.state;
        return (
            <div className={classes.container}>
                <PDF file={ fileURL }
                     onDocumentComplete={this.onDocumentComplete}
                     onPageComplete={this.onPageComplete}
                     page={pageNumber}
                     className={classes.pdfContent}
                />
                <a
                    href={fileURL}
                    download={'RobertConcepcionResume'}
                    className={classes.downloadButtonContainer}>
                    {shouldShowHoverContent && 
                    (
                        <Tooltip
                            id={`resume-pdf-download-tooltip`}
                            delayShow={700}
                            place="top"
                        ><span>Download this PDF</span>
                        </Tooltip>
                    )}
                    <Button
                        fab color="accent"
                        data-tip data-for={`resume-pdf-download-tooltip`}
                    ><i className={`mdi mdi-download ${classes.downloadIcon}`}/>
                    </Button>
                </a>
                <PDFViewerNav
                    pageNumber={pageNumber}
                    pageCount={pageCount}
                    handleNextPage={this.handleNextPage}
                    handlePrevPage={this.handlePrevPage}
                />
            </div>
        );
    }
}

export default pure(withStyles(styleSheet)(PDFViewer));