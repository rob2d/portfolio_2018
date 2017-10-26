import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import pure from 'recompose/pure'
import strings, { projects } from 'strings'
import connect from 'react-redux/lib/connect/connect'
import appHistory from 'tools/appHistory'
import withFadeTransitions from 'tools/withFadeTransitions'
import MediaReel from './MediaReel'
import projectsData from 'app-root/data/projectsData'

const findProject = (projectId)=>projects.projectData.find((p)=>(p.id==projectId));

const styleSheet = {
    mainContainer : {
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
    contentContainer : {
        margin : '16px 0px',
        paddingLeft : '16px',
        paddingRight : '16px'
    },
    title : {
        fontSize : '22pt',
        textAlign : 'left'
    },
    description : {
        fontSize     : '13pt',
        textAlign    : 'justify',
        paddingTop   : '16px',
        paddingLeft  : '16px',
        paddingRight : '16px'
    },
    screenshotsHeader : {
        textPadding : '16px',
        textAlign : 'left',
        fontSize : '16pt',
        marginBottom : '0px'
    },
    screenshots : {
        display : 'inline-block',
        width  : 'calc(100vw-64px)',
        height : 'auto',
        margin : '16px',
        borderTop    : '#000000 2px solid',
        borderBottom : '#000000 2px solid'
    },
    screenshot : {
        minWidth : '56px',
        width  : 'auto',
        height : '56px',
        margin : '16px 8px'
    },
    disclaimer : {
        display    : 'flex',
        maxWidth   : '600px',
        padding    : '8px 0px',
        textAlign  : 'justify',
        alignItems : 'center',
        justifyContent : 'flex-start'
    },
    disclaimerNote :  {
        display   : 'flex',
        flexAlign : 'row',
        fontSize  : '14pt',
        textAlign : 'justify'
    },
    disclaimerIcon : {
        fontSize : '22pt',
    },
    '@media (max-width: 400px)': {
        disclaimerIconContainer : {
            display : 'none !important',
            opacity : '0'
        }
    },
    disclaimerIconContainer : {
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        margin         : '16px 0px',
        color          : '#0000CC'
    },
    returnToProjects : {
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
        fontSize : '20pt',
        fontWeight : 700,
        textAlign : 'left'
    },
    sectionContent : {
        fontSize     : '13pt',
        textAlign    : 'justify',
        paddingLeft  : '16px',
        paddingRight : '16px'
    }
};

const ProjectDetails = withFadeTransitions(injectSheet(styleSheet)(
    function ProjectDetails({ classes, match, projectId, viewportWidth }) { 
        const project = findProject(projectId);
        const pData = projectsData[projectId];
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
                    { 
                        <div className={classes.section}>
                            <p className={classes.sectionHeader}>
                                Media
                            </p>
                            <p className={classes.sectionContent}>
                                <MediaReel 
                                    maxWidth={ 800 }
                                    width={ Math.round(viewportWidth * 0.80) }
                                    aspectRatio={ pData.mediaAspectRatio }
                                    projectId={projectId}
                                    media={pData.media}
                                />
                            </p>
                        </div>
                    }
                    { project.links && (
                        <div className={classes.section}>
                            <p className={classes.sectionHeader}>
                                Links
                            </p>
                            <p className={classes.sectionContent}>
                                {project.links.map((l)=>(
                                    <p><a href={l.url} target="_new">{l.desc}</a></p>)
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
                    <p className={ classes.returnToProjects }>
                        Return to the Projects page.
                    </p>
                    </div>
                </div>
            </div>
        )
    })
);

let VisibleProjectView = connect(
    (state,ownProps)=> ({ 
        language : state.core.language,
        viewportWidth : state.core.viewportWidth 
    }),
    (dispatch)=>       ({})
)(ProjectDetails);

export default VisibleProjectView