import React from 'react'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import PDFViewer from './PDFViewer'

const RESUME_URL = '/downloads/concepcion_resume_Q42018.pdf';

const styleSheet = {
    container : {
        marginLeft     : 'auto',
        marginRight    : 'auto',
        width          : '100%',
        flexGrow       : 1,
        display        : 'flex',
        flexDirection  : 'column',
        justifyContent : 'center',
    }
};
const CV = ({ classes, theme })=> (
    <div className={classes.container}>
        <PDFViewer fileURL={ RESUME_URL } theme={ theme } />
    </div>
);

let VisibleCV = pure(connect(
    (state, ownProps)=> ({
        theme         : state.core.theme,
        viewportWidth : state.core.viewportWidth,
        viewportHeight: state.core.viewportHeight
    }),
    null
)(injectSheet(styleSheet)(CV)));

export default VisibleCV