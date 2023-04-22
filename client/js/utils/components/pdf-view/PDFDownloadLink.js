import { useMemo, cloneElement } from 'react';
import { useTheme } from '@mui/styles';
import useDebouncedMemo from '@sevenoutman/use-debounced-memo';
import { pdf } from '@react-pdf/renderer';
import Downloader from 'js-file-downloader';

/**
 * Wraps PDFViewer found in @react-pdf/renderer and supplements
 * functionality so that the PDFView element passed, as well
 * as debounces it so that we do not have to worry about
 * stream errors with thrashing PDF renderer lib
 *
 * @param {object} param0
 * @param {number} param0.debounceMs (default 500)
 * @param {any} param0.children the PDF view to download
 */
export default function PDFDownloadLink({
    debounceMs=500,
    children,
    pdfContent,
    filename
}) {
    const theme = useTheme();

    /**
     * pdf element passed with theme prop injected
     * into the node needed
     */
    const themedPdf = useDebouncedMemo(() => (
        cloneElement(pdfContent, { theme })
    ), [pdfContent, theme], debounceMs);

    const downloadLink = useMemo(() => {
        const onClick = () => {
            pdf(themedPdf).toBlob().then( blob => {
                const url = URL.createObjectURL(blob);

                new Downloader({ url, filename })
                    .then(() => /* success */ true )
                    .catch(() => /* error */ false);
            });
        };

        return cloneElement(children, { onClick });
    }, [children, themedPdf, filename]);

    return downloadLink;
}
