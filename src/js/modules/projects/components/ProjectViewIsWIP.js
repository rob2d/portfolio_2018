import React, { PureComponent } from 'react'
import pure from 'recompose/pure'
import { withStyles } from 'material-ui/styles'
import strings, { projects } from 'strings'
import connect from 'react-redux/lib/connect/connect'
import Paper   from 'material-ui/Paper'
import appHistory from 'tools/appHistory'

const findProject = (projectId)=>projects.projectData.find((p)=>(p.id==projectId));

const styleSheet = (theme) =>
({
    mainContainer :
    {
        flexGrow     : 1,
        margin       : '0 auto',
        textAlign    : 'center',
        maxWidth     : '1024px'
    },
    contentContainer :
    {
        margin : '16px auto'
    },
    title :
    {
        fontSize : '22pt',
        textAlign : 'left'
    },
    description :
    {
        fontSize : '18pt',
        textAlign : 'left'
    },
    screenshotsHeader :
    {
        textPadding : '16px',
        textAlign : 'left',
        fontSize : '16pt',
        marginBottom : '0px'
    },
    screenshots :
    {
        display : 'inline-block',
        width  : 'calc(100vw-64px)',
        height : 'auto',
        margin : '16px',
        borderTop    : '#000000 2px solid',
        borderBottom : '#000000 2px solid'
    },
    screenshot :
    {
        minWidth : '56px',
        width  : 'auto',
        height : '56px',
        margin : '16px 8px'
    },
    disclaimer :
    {
        maxWidth  : '600px',
        margin    : '16px auto 0px',
        padding   : '8px 16px',
        color     : '#BB4433',
        textAlign : 'justify'
    },
    returnToProjects :
    {
        cursor : 'pointer',
        color : '#0000CC',
        '&:active':
        {
            color : '#4488FF'
        }
    }
});

const ProjectView = withStyles(styleSheet)(
({ classes, match, projectId = match.params.projectId, project = findProject(projectId)} )=>
(
    <div className={ classes.mainContainer }>
        { (()=>{ console.log('match ->', match) })() }
        <Paper className={ classes.disclaimer }>
            <p>
                This view  is a work in progress. There is more to come but content is not available.
                Please check back in the first week of August.
            </p>
            <p>
                <span
                    className={classes.returnToProjects}
                    onClick={ ()=> appHistory.goTo(`/projects`) }>
                    Click Here to return to the Projects page.
                </span>
            </p>
        </Paper>
        <div className={classes.contentContainer}>
            <p className={classes.title}>
                {project.title}
            </p>
            <p className={classes.description}>
                {project.description || project.shortDescription}
            </p>
        </div>
    </div>
));

let VisibleProjectView = pure(connect(
    (state,ownProps)=> ({ language : state.core.language }),
    (dispatch)=>       ({})
)(withStyles(styleSheet)(ProjectView)));

export default VisibleProjectView;