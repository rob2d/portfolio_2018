import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import PDFViewer from './PDFViewer'

const RESUME_URL = '/downloads/concepcion_resume_Q42018.pdf';

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

function CV ({ theme }) {
    const classes = useStyles();

    return (
        <div className={ classes.container }>
            <PDFViewer 
                fileURL={ RESUME_URL } 
                theme={ theme }    
            />
        </div>
    );
}

export default connect(
({ core : { theme }, viewport : { vpW, vpH }}) => ({
    theme,
    vpW,
    vpH
}))(CV);