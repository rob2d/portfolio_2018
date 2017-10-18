import React, { PureComponent } from 'react'
import pure from 'recompose/pure'
import { withStyles } from 'material-ui/styles'
import strings, { projects } from 'strings'
import connect from 'react-redux/lib/connect/connect'
import Paper   from 'material-ui/Paper'
import appHistory from 'tools/appHistory'
import withFadeTransitions from 'tools/withFadeTransitions'

const findProject = (projectId)=>projects.projectData.find((p)=>(p.id==projectId));

const styleSheet = (theme) =>(
{
    mainContainer :
    {
        flexGrow     : 1,
        margin       : '0 auto',
        textAlign    : 'center',
        maxWidth     : '1024px',
        marginTop    : '96px',
        paddingLeft  : '32px',
        paddingRight : '32px',
        paddingBottom : '16px',
        marginBottom  : '16px'
    },
    contentContainer :
    {
        margin : '16px 0px'
    },
    title :
    {
        fontSize : '22pt',
        textAlign : 'left'
    },
    description :
    {
        fontSize   : '16pt',
        textAlign  : 'left',
        paddingTop : '16px'
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
        maxWidth   : '600px',
        margin     : '16px auto 48px',
        padding    : '8px 16px',
        color      : '#BB4433',
        textAlign  : 'justify',
        alignItems : 'center',
        justifyContent : 'center'
    },
    disclaimerNote : 
    {
        display   : 'flex',
        flexAlign : 'row',
        fontSize  : '14pt',
        textAlign : 'justify'
    },
    disclaimerIcon : {
        fontSize : '24pt'
    },
    disclaimerIconContainer : {
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        margin         : '16px'
    },
    returnToProjects :
    {
        cursor     : 'pointer',
        color      : '#0000CC',
        marginLeft : '64px',
        marginTop  : '0px',
        fontSize   : '14pt'
    },
    section : {
        marginBottom : '16px'
    },
    sectionHeader : {
        textTransform : 'uppercase',
        fontSize : '20pt'
    },
    sectionContent : {
        fontSize  : '16pt',
        textAlign : 'center'
    }
});

const ProjectDetails = withFadeTransitions(withStyles(styleSheet)(
    function ProjectDetails({ classes, match, projectId })
    { 
        const project = findProject(projectId);
        return (
            <div className={ classes.mainContainer }>
                               <Paper className={ classes.disclaimer }>
                    <div className={classes.disclaimerNote}>
                        <div className={classes.disclaimerIconContainer}>
                            <i className={`mdi mdi-alert ${classes.disclaimerIcon}`}/>
                        </div>
                        <p>
                            This section is a work in progress and
                            does not yet contain all relevant content.
                            Check back soon for updates!
                        </p>
                    </div>
                    <p
                        className={ classes.returnToProjects }
                        onClick={ ()=> appHistory.goTo(`/projects`) }
                    >Click Here to return to the Projects page.
                    </p>
                </Paper>
                <div className={classes.contentContainer}>
                    <p className={classes.description}>
                        {project.description || project.shortDescription}
                    </p>
                    {project.technologies && (
                        <div className={classes.section}>
                            <p className={classes.sectionHeader}>
                                Technologies
                            </p>
                            <p className={classes.sectionContent}>
                                {project.technologies}
                            </p>
                        </div>
                    )}
                    {/*
                        <div className={classes.contentContainer}>
                            <p className={classes.sectionHeader}>
                                Screenshots
                            </p>
                            <p className={classes.sectionContent}>
                                - no images available -
                            </p>
                        </div>
                    */}
                    {
                        project.videos && project.videos.map((video)=>{
                    
                        if(video.embed) {
                            return (
                                <div className={classes.section}>
                                    <p className={classes.sectionHeader}>Videos</p>
                                    <p className={classes.sectionContent}>
                                    <iframe 
                                        width="300" 
                                        height="220" 
                                        src={video.url}
                                        frameborder="0" 
                                        allowfullscreen 
                                    />
                                    </p>
                                </div>
                            );
                        } else { return (<div style={{display : 'none'}} />) }
                    })}
                    { project.links && (
                        <div className={classes.section}>
                            <p className={classes.sectionHeader}>
                                Links
                            </p>
                            <p className={classes.sectionContent}>
                                {project.links.map((l)=>(
                                    <p><a href={l.url}>{l.desc}</a></p>)
                                )}
                            </p>
                        </div>
                    )}
                    { project.source && (
                        <div className={classes.section}>
                            <p className={classes.sectionHeader}>
                                Source Code
                            </p>
                            <p className={classes.sectionContent}>
                                {project.source.map((l)=>(
                                    <p><a href={l.url}>{l.desc}</a></p>)
                                )}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        )
    })
);

let VisibleProjectView = connect(
    (state,ownProps)=> ({ language : state.core.language }),
    (dispatch)=>       ({})
)(ProjectDetails);

export default VisibleProjectView;