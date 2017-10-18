import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import { cv as strings } from 'strings'
import PDFViewer from './PDFViewer'
const RESUME_URL = '/downloads/concepcion_resume_201709.pdf';

const styleSheet = (theme) =>
({
    container :
    {
        marginLeft     : 'auto',
        marginRight    : 'auto',
        width          : '100%',
        flexGrow       : 1,
        display        : 'flex',
        flexDirection  : 'column',
        justifyContent : 'center',
    }
});
const CV = ({ classes })=>
(
    <div className={classes.container}>
        <PDFViewer fileURL={ RESUME_URL }/>
    </div>
);

let VisibleCV = pure(withStyles(styleSheet)(connect(
    (state,ownProps)=> (
    {
        language : state.core.language,
        viewportWidth : state.core.viewportWidth,
        viewportHeight: state.core.viewportHeight
    }),
    null
)(CV)));

export default VisibleCV