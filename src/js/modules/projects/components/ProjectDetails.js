import React, { PureComponent } from 'react'
import pure from 'recompose/pure'
import { withStyles } from 'material-ui/styles'
import strings, { projects } from 'strings'
import connect from 'react-redux/lib/connect/connect'
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
        margin : '16px 0px',
        paddingLeft : '16px',
        paddingRight : '16px'
    },
    title :
    {
        fontSize : '22pt',
        textAlign : 'left'
    },
    description :
    {
        fontSize   : '14pt',
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
        display    : 'flex',
        maxWidth   : '600px',
        padding    : '8px 0px',
        textAlign  : 'justify',
        alignItems : 'center',
        justifyContent : 'flex-start'
    },
    disclaimerNote : 
    {
        display   : 'flex',
        flexAlign : 'row',
        fontSize  : '14pt',
        textAlign : 'justify'
    },
    disclaimerIcon : {
        fontSize : '22pt'
    },
    disclaimerIconContainer : {
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        margin         : '16px 0px',
        color          : '#0000CC'
    },
    returnToProjects :
    {
        display      : 'inline-block',
        cursor       : 'pointer',
        color        : '#0000CC',
        marginLeft   : '16px',
        marginTop    : '0px',
        marginBottom : '0px',
        fontSize     : '14pt',
        textAlign    : 'left'
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
                                        width="280" 
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

                    <div className={ classes.disclaimer } onClick={ ()=> appHistory.goTo(`/projects`) }>
                    <div className={classes.disclaimerIcon}>
                        <div className={classes.disclaimerIconContainer}>
                            <i className="mdi mdi-arrow-left-box"/>
                        </div>
                    </div>
                    <p
                        className={ classes.returnToProjects }
                    >Click Here to return to the Projects page.
                    </p>
                    </div>
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