import { useMemo } from 'react';
import C from 'color';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import useViewportSizes from 'use-viewport-sizes';
import Icon from '@mdi/react';
import { mdiDownload } from '@mdi/js';
import { useDocumentTitle } from 'utils/hooks';
import { PDFView, PDFDownloadLink } from 'utils/components/pdf-view';
import ResumePDFView from './ResumePDFView';

const useStyles = makeStyles(({ palette: { primary, secondary, common } }) => ({
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        overflowY: 'auto',
        boxSizing: 'border-box',
        maxHeight: '100%',
        position: 'relative',
        overflow: 'hidden'
    },
    pdfWrapper: {
        position: 'relative',
        overflow: 'auto',
    },
    pdfView: {
        width: '100%',
        height: 'auto',
        overflowX: 'hidden',
        overflowY: 'hidden'
    },
    downloadButtonContainer: {
        position: 'absolute',
        bottom: '32px',
        right: '32px',
    },
    downloadButton: {
        backgroundColor: secondary.main,
        color: common.white,
        '&:hover': {
            backgroundColor: `${C(secondary.main).lighten(0.2).rgb()}`
        },
        '&:active': {
            backgroundColor: common.active
        },
        '& svg': {
            fontSize: '24pt',
            color: common.white,
            fill: common.white
        }
    },
    portfolioNotice: {
        width: '100%',
        backgroundColor: primary.dark,
        color: common.white,
        paddingTop: '8px',
        paddingBottom: '8px',
        '& a': {
            fontWeight: 900
        }
    }
}), { name: 'CV' });

export default function CV() {
    useDocumentTitle({ title: `${SITE_NAME} -- CV` });

    const [vpW, vpH] = useViewportSizes();

    const [width, height] = useMemo(() => {
        const aspectRatio = vpW / vpH;

        // if we have a really thin aspect
        // ratio, then fill entire screen
        // width

        if(aspectRatio < 0.66) {
            return [
                Math.round(vpW - 16),
                Math.round((vpW - 16) / 0.8)
            ];
        }

        if(vpW > 400) {
            return [
                Math.round(vpW * 0.8),
                Math.round(vpH - 156)
            ];
        }

        return [
            Math.round(vpW * 0.92),
            Math.round(vpH - 156)
        ];
    }, [vpW, vpH]);

    const classes = useStyles({ width, height });

    return (
        <>
            <div className={ classes.container }>
                <div className={ classes.pdfWrapper }>
                    <PDFView
                    className={ classes.pdfView }
                    width={ width }
                    height={ height }
                    PDFDocComponent={ ResumePDFView }
                />
                </div>
                <Tooltip
                id={ `resume-pdf-download-tooltip` }
                enterDelay={ 400 }
                title={ `Download this PDF` }
            >
                    <div className={ classes.downloadButtonContainer }>
                        <PDFDownloadLink
                        filename={ 'RobertConcepcionResume.pdf' }
                        pdfContent={ (<ResumePDFView />) }
                    >
                            <Fab
                            className={ classes.downloadButton }
                            data-tip
                            data-for={ `resume-pdf-download-tooltip` }
                        >
                                <Icon
                                path={ mdiDownload }
                                className={ classes.downloadIcon }
                                size={ 1.25 }
                            />
                            </Fab>
                        </PDFDownloadLink>
                    </div>
                </Tooltip>
            </div>
            <Typography
                variant={ 'caption' }
                className={ classes.portfolioNotice }
            >
                Auto-generated in React by Rob
            </Typography>
        </>
    );
}
