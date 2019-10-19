import React, { useMemo } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const mimeTypeDict = {
    'webp' : 'image/webp',
    'jpg' : 'image/jpeg',
    'jpeg' : 'image/jpeg',
    'png' : 'image/png',
    'svg' : 'image/svg+xml'
};

const useStyles = makeStyles( theme => ({
    container : {
        '& img' : {
            width : '100%',
            height : 'auto'
        }
    }
}), { name : 'OptimizedImg' });

/**
 * Converts a png, jpg, or image (at least used
 * in this portfolio so far) to equivalent .webp
 * img with fallback via picture element.
 * @param {*} param0
 * @param {String} param0.src image sources
 */
export default function OptimizedImg({ src, className, ...props }) {
    const classes = useStyles();
    const sourceElems = useMemo(() => {
        const extIndex = src.lastIndexOf('.');
        const filePrefix = src.substring(0,extIndex);
        const srcExt = src.substring(extIndex+1);

        const exts = ['webp'];

        if(srcExt != 'webp') {
            exts.push(srcExt);
        }

        return exts.map( ext => (
            <source
                srcSet={ src }
                type={ mimeTypeDict[ext] }
                { ...props }
            />
        ));
    }, [src, Object.keys(props).sort().map( k => props[k] )]);

    return (
        <picture className={ clsx(className, classes.container) }>
            { sourceElems }
            <img src={ src } { ...props } />
        </picture>
    );
}
