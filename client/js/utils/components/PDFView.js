import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { useMemo } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useDebouncedMemo from '@sevenoutman/use-debounced-memo';
import { BlobProvider } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc=`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
    pdfjs.version
}/pdf.worker.js`;

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
    const document = useMemo(() => (
        <PDFDocComponent theme={ theme } />
    ), [PDFDocComponent, theme]);

    const content = useDebouncedMemo(() => (
        <BlobProvider document={ document }>
            {({ blob, url, loading }) => loading ? <div>Loading</div> : (
                <Document
                    file={ url }
                    renderMode={ 'canvas' }
                    { ...viewerProps }
                >
                    <Page
                        pageNumber={ 1 }
                        width={ viewerProps?.width || undefined }
                    />
                </Document>
            ) }
        </BlobProvider>
    ), [viewerProps, document], debounceMs);

    return content;
}
