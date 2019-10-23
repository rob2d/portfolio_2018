import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDocumentTitle } from 'utils/hooks';
import PDFViewer from './PDFViewer';

const RESUME_URL = '/downloads/concepcion_resume_102019.pdf';

const useStyles = makeStyles(() => ({
    container : {
        marginLeft : 'auto',
        marginRight : 'auto',
        width : '100%',
        flexGrow : 1,
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
    }
}));

export default function CV() {
    useDocumentTitle({ title : `${SITE_NAME} -- CV` });
    const classes = useStyles();

    return (
        <div className={ classes.container }>
            <PDFViewer fileURL={ RESUME_URL } />
        </div>
    );
}
