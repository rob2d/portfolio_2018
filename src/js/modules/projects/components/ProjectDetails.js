import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import pure from 'recompose/pure'
import strings, { projects } from 'strings'
import connect from 'react-redux/lib/connect/connect'
import appHistory from 'tools/appHistory'
import withFadeTransitions from 'tools/withFadeTransitions'
import MediaReel from './media-reel/MediaReel'
import projectsData from 'app-root/data/projectsData'

const findProjectStrings = (projectId)=>projects.projectData.find((p)=>(p.id==projectId));

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
        textAlign    : 'left',
        paddingTop   : '16px',
        paddingLeft  : '16px',
        paddingRight : '16px'
    },
    // only on tablet sized device+ or certain
    // large screens in landscape should we
    // begin to justify text
    '@media (min-width:800px)' : {
        description : {
            textAlign : 'justify !important'
        }
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
        textAlign : 'left'
    },
    disclaimerIcon : {
        fontSize : '22pt',
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
        textAlign    : 'left',
        paddingLeft  : '16px',
        paddingRight : '16px'
    },
    sectionStandalone : {
        fontSize : '14pt',
        paddingRight : '16px',
        fontWeight : 'bold',
        textAlign : 'left'
    },
    bulletItemContainer : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start'
    },
    bulletLink : {
        width : '100%'
    },
    bulletIcon : {
        paddingRight : '16px'
    }
};

const ProjectDetails = withFadeTransitions(injectSheet(styleSheet)(
    function ProjectDetails({ classes, match, projectId, viewportWidth }) { 
        const project = findProjectStrings(projectId);
        const pData = projectsData[projectId];

        // TODO : use redux to hydrate media data
        let media = (()=>{
            if(pData && pData.media && pData.media.length > 0) {
                // if media captions exist in project strings,
                // concat those to our media
                if(project.mediaCaptions && project.mediaCaptions.length > 0) {
                    return pData.media.map((item,i)=>({
                        ...item,
                        caption : project.mediaCaptions[i]
                    })); 
                }
                else return pData.media;
            }
        })();
        
        return (
            <div className={ classes.mainContainer }>
                <div className={classes.contentContainer}>
                    { project && (
                            <div className={classes.section}>
                                <p className={classes.sectionStandalone}>
                                  {project.roles}
                                </p>
                            </div>
                        )}
                    {project.description && Array.isArray(project.description) ? 
                        project.description.map((d)=>(
                            <p className={classes.description}>
                             {d}
                            </p>
                        )) : (  
                        <p className={classes.description}>
                            {project.description || project.shortDescription}
                        </p>)
                    }
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
                    { pData && pData.media && pData.media.length > 0 && 
                    (
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
                                    media={media}
                                />
                            </p>
                        </div>
                    )}
                    { pData && pData.sourceCode && (
                        <div className={classes.section}>
                            <p className={classes.sectionHeader}>
                                Source Code
                            </p>
                            <p className={classes.sectionContent}>
                                {pData.sourceCode.map((link,i)=>(
                                <a href={link} target="_new">
                                    <div className={classes.bulletItemContainer}>
                                            <i className={`mdi mdi-code-tags ${classes.bulletIcon}`}/>
                                            <p className={classes.bulletTextContainer}>
                                                {project.sourceCodeDescriptions[i]}
                                            </p>
                                    </div>
                                </a>)
                                )}
                            </p>
                        </div>
                    )}
                    { pData && pData.documentation && (
                        <div className={classes.section}>
                            <p className={classes.sectionHeader}>
                                Documentation
                            </p>
                            <p className={classes.sectionContent}>
                                {pData.documentation.map((link, i)=>(
                                <a href={link} target="_new">
                                    <div className={classes.bulletItemContainer}>
                                        <i className={`mdi mdi-note-outline ${classes.bulletIcon}`}/>
                                        <p className={classes.bulletTextContainer}>
                                            {project.documentationDescriptions[i]}
                                        </p>
                                    </div>    
                                </a>
                                ))}
                            </p>
                        </div>
                    )}
                    { pData && pData.downloads && (
                    <div className={classes.section}>
                        <p className={classes.sectionHeader}>
                            Downloads
                        </p>
                        <p className={classes.sectionContent}>
                            {pData.downloads.map((link, i)=>(
                            <a href={link} target="_new">
                                <div className={classes.bulletItemContainer}>
                                    <i className={`mdi mdi-download ${classes.bulletIcon}`}/>
                                    <p className={classes.bulletTextContainer}>
                                        {project.downloadDescriptions[i]}
                                    </p>
                                </div>    
                            </a>
                            ))}
                        </p>
                    </div>
                )}
                    { pData && pData.links && (
                        <div className={classes.section}>
                            <p className={classes.sectionHeader}>
                                Links
                            </p>
                            <p className={classes.sectionContent}>
                                {pData.links.map((link, i)=>(
                                <a href={link} target="_new">
                                    <div className={classes.bulletItemContainer}>
                                            <i className={`mdi mdi-link ${classes.bulletIcon}`}/>
                                            <p className={classes.bulletTextContainer}>
                                                {project.linkDescriptions[i]}
                                            </p>
                                    </div>
                                </a>)
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
                        Back to Projects
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