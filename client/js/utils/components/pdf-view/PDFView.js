import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { useCallback, useMemo, useState } from 'react';
import { useTheme, makeStyles } from '@mui/material/styles';
import useDebouncedMemo from '@sevenoutman/use-debounced-memo';
import { BlobProvider } from '@react-pdf/renderer';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { Button, Tooltip } from '@mui/material';
import { Icon } from '@mdi/react';
import {
    mdiPageNext,
    mdiPagePrevious
} from '@mdi/js';

const useStyles = makeStyles(({ palette: { mode, text, common } }) => ({
    prevPage: {
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)'
    },
    nextPage: {
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)'
    }
}), { name: 'PDFView' });

/**
 * Wraps PDFViewer found in @react-pdf/renderer and supplements
 * functionality so that the PDFView element passed, as well
 * funneling theme + debounces rendering so that we do not have
 * to worry about stream errors with thrashing PDF renderer lib
*
* @param {object} param0
* @param {object|array} param0.style
* @param {number} param0.width
* @param {number} param0.height
* @param {any} param0.children
* @param {string} param0.className
* @param {number} param0.debounceMs (default 500)
*/
export default function PDFView({
    debounceMs=500,
    PDFDocComponent,
    ...viewerProps
}) {
    const theme = useTheme();
    const classes = useStyles();

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = useCallback(({ numPages }) => {
        setNumPages(numPages);
    }, []);

    const onPrevPage = useCallback(() => {
        setPageNumber(pageNumber - 1);
    }, [pageNumber]);

    const onNextPage = useCallback(() => {
        setPageNumber(pageNumber + 1);
    }, [pageNumber]);

    const document = useMemo(() => (
        <PDFDocComponent theme={ theme } />
    ), [PDFDocComponent, theme]);

    const content = useDebouncedMemo(() => (
        <BlobProvider document={ document }>
            {({ blob, url, loading }) => loading ?
                (<div>Loading</div>) :
                (
                    <>
                        <Document
                            file={ url }
                            renderMode={ 'canvas' }
                            onLoadSuccess={ onDocumentLoadSuccess }
                            { ...viewerProps }
                        >
                            <Page
                                pageNumber={ pageNumber }
                                width={ viewerProps?.width || undefined }
                            />
                        </Document>

                        {pageNumber <= 1 ? undefined : (
                            <Tooltip enterDelay={ 400 } title={ 'View Previous Page' }>
                                <Button className={ classes.prevPage } onClick={ onPrevPage }>
                                    <Icon
                                        path={ mdiPagePrevious }
                                        size={ 1 }
                                        color={ theme.palette.secondary.main }
                                    />
                                </Button>
                            </Tooltip>
                        )}
                        { pageNumber >= numPages ? undefined : (
                            <Tooltip enterDelay={ 400 } title={ 'View Next Page' }>
                                <Button className={ classes.nextPage } onClick={ onNextPage }>
                                    <Icon
                                        path={ mdiPageNext }
                                        size={ 1 }
                                        color={ theme.palette.secondary.main }
                                />
                                </Button>
                            </Tooltip>
                        )}
                    </>
            ) }
        </BlobProvider>
    ), [viewerProps, document], debounceMs);

    return content;
}
