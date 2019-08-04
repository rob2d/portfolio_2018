import React from 'react'
import { makeStyles } from '@material-ui/styles'
import PDFViewer from './PDFViewer'

const RESUME_URL = '/downloads/concepcion_resume_Q32019.pdf';

const useStyles = makeStyles( theme => ({
    container : {
        marginLeft     : 'auto',
        marginRight    : 'auto',
        width          : '100%',
        flexGrow       : 1,
        display        : 'flex',
        flexDirection  : 'column',
        justifyContent : 'center',
    }
}));

function CV () {
    const classes = useStyles();

    return (
        <div className={ classes.container }>
            <PDFViewer fileURL={ RESUME_URL } />
        </div>
    );
}

export default CV