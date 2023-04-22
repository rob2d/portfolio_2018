import { useMemo } from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
const PREFIX = 'OptimizedImg';

const classes = {
    container: `${PREFIX}-container`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        '& img, & source, & picture': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%'
        }
    }
}));

const mimeTypeDict = {
    'webp': 'image/webp',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'svg': 'image/svg+xml'
};

/**
 * Converts a png, jpg, or image (at least used
 * in this portfolio so far) to equivalent .webp
 * img with fallback via picture element.
 * @param {*} param0
 * @param {String} param0.src image sources
 */
export default function OptimizedImg({ src, className, ...props }) {

    const sourceElems = useMemo(() => {
        const extIndex = src.lastIndexOf('.');
        const filePrefix = src.substring(0,extIndex);
        const srcExt = src.substring(extIndex+1);

        const exts = process.env.NODE_ENV != 'development' ? ['webp'] : [];

        if(srcExt != 'webp') {
            exts.push(srcExt);
        }

        return exts.map( ext => (
            <source
                srcSet={ `${filePrefix}.${ext}` }
                type={ mimeTypeDict[ext] }
                key={ `${filePrefix}.${ext}` }
                { ...props }
            />
        ));
    }, [src, Object.keys(props).sort().map( k => props[k] )]);

    return (
        <Root className={ clsx(classes.container, className) }>
            <picture className={ classes.picture }>
                { sourceElems }
                <img src={ src } { ...props } />
            </picture>
        </Root>
    );
}
