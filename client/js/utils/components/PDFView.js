import { cloneElement } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useDebouncedMemo from '@sevenoutman/use-debounced-memo';
import { PDFViewer } from '@react-pdf/renderer';

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
export default function PDFView({ debounceMs=500, children, ...viewerProps }) {
    const theme = useTheme();

    const content = useDebouncedMemo(() => (
        <PDFViewer { ...viewerProps }>
            { cloneElement(children, { theme }) }
        </PDFViewer>
    ), [viewerProps, children, theme], debounceMs);

    return content;
}
