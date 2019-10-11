import { useEffect } from 'react';

/**
 * set the title of a window
 * when component is mounted or
 * if mounted and title is changed
 *
 * @param {Object} param0
 * @param {String} param0.title
 */
export default function useDocumentTitle({ title }) {
    useEffect(() => {
        if(title) {
            window.document.title = title;
        }
    }, [title]);
}
