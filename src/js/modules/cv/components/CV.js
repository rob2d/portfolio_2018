import React from 'react'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import { withStyles } from '@material-ui/core/styles'
import PDFViewer from './PDFViewer'

const RESUME_URL = '/downloads/concepcion_resume_201808.pdf';

const styleSheet = (theme) => ({
    container : {
        marginLeft     : 'auto',
        marginRight    : 'auto',
        width          : '100%',
        flexGrow       : 1,
        display        : 'flex',
        flexDirection  : 'column',
        justifyContent : 'center',
    }
});
const CV = ({ classes, theme })=> (
    <div className={classes.container}>
        <PDFViewer fileURL={ RESUME_URL } theme={ theme }/>
    </div>
);

let VisibleCV = pure(withStyles(styleSheet)(connect(
    (state, ownProps)=> ({
        theme : state.core.theme,
        viewportWidth : state.core.viewportWidth,
        viewportHeight: state.core.viewportHeight
    }),
    null
)(CV)));

export default VisibleCV