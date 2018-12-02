import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import pure from 'recompose/pure'
import strings, { projects } from 'strings'
import { connect } from 'react-redux'
import appHistory from 'tools/appHistory'
import withFadeTransitions from 'tools/withFadeTransitions'
import ButtonLink from 'tools/components/ButtonLink'
import MediaReel from './media-reel/MediaReel'
import ProjectTechnologies from './ProjectTechnologies'
import projectsData from 'app-root/data/projectsData'
import Themes from 'constants/Themes'

const findProjectStrings = (projectId)=> (
    projects.projectData.find( p =>(p.id == projectId))
);

const getTextColor = ({ theme }) => ((theme == Themes.LIGHT) ? 
    '#000000' : '#FFFFFF'
);

const styleSheet = {
    mainContainer : {
        flexGrow     : 1,
        margin       : '0 auto',
        textAlign    : 'left',
        maxWidth     : '1024px',
        marginTop    : '96px',
        paddingLeft  : '32px',
        paddingRight : '32px',
        paddingBottom : '16px',
        marginBottom  : '16px'
    },

    '@media (max-width:800px)' : {
        mainContainer : {
            paddingLeft : '16px',
            paddingRight : '16px'
        }
    },

    '@media (max-width:400px)' : {
        mainContainer : {
            paddingLeft  : '12px !important',
            paddingRight : '12px !important'
        }
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
        paddingLeft  : '16px',
        paddingRight : '16px',
        color : getTextColor
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
    returnContainer : {
        display        : 'flex !important',
        maxWidth       : '600px !important',
        margin         : '40px 0px 16px !important',
        padding        : '6px !important',
        textAlign      : 'justify !important',
        alignItems     : 'center !important',
        justifyContent : 'flex-start !important',
        fontSize       : '13pt',
        '&:hover $returnText' : {
            color : '#ff4081 !important'
        },
        '&:active $returnText' : {
            color : '#00b8d4 !important'
        }
    },
    returnIcon : {
        fontSize : '22pt',
    },
    returnIconContainer : {
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        margin         : '0px',
        color          : '#0000CC'
    },
    returnText : {
        display      : 'inline-block',
        cursor       : 'pointer',
        marginTop    : '0px',
        marginBottom : '0px',
        fontSize     : '14pt',
        textAlign    : 'left',
        color        : '#c51162',
        fontFamily   : 'roboto_bold',
        fontSize     : '12pt'
    },
    section : {
        margin : '16px 0px 32px',
        color : getTextColor
    },
    sectionHeader : {
        fontFamily : 'roboto_bold',
        fontSize   : '14pt',
        fontWeight : 700,
        textAlign  : 'left',
        margin     : '16px 0px'
    },
    sectionContent : {
        fontSize     : '13pt',
        textAlign    : 'left',
        paddingLeft  : '16px',
        paddingRight : '16px',
        marginTop    : '0px'
    },
    sectionRole : {
        fontSize     : '14pt',
        paddingLeft  : '8px',
        paddingRight : '16px',
        paddingTop   : '8px',
        fontWeight   : 'bold',
        textAlign    : 'left',
        fontFamily   : 'roboto_bold'
    },
    linkContainer : {
        display : 'flex !important',
        flexDirection : 'row !important',
        alignItems : 'center !important',
        justifyContent : 'flex-start !important',
        '&:hover $linkText' : {
            color : '#ff4081 !important'
        },
        '&:active $linkText' : {
            color : '#00b8d4 !important'
        }
    },
    bulletLink : {
        width : '100%'
    },
    linkIcon : {
        paddingRight : '16px',
        color        : ({ theme }) => ((theme == Themes.LIGHT) ? 
            '#000000' : '#FFFFFF'
        ),
        fontSize : '12pt'
    },
    // TODO : use a global style/theme for this,
    linkText : {
        margin      : '12px 0px',
        padding     : '0px',
        color       : '#c51162',
        fontFamily  : 'roboto_bold',
        fontSize    : '12pt',
        textAlign   : 'left'
    }
};

const ProjectDetails = withFadeTransitions(injectSheet(styleSheet)(
    function ProjectDetails({ classes, match, projectId, viewportWidth, theme }) { 
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
                                <p className={classes.sectionRole}>
                                  {project.roles}
                                </p>
                            </div>
                        )
                    }
                    {project.technologySet && project.technologySet.size && (
                    <div className={classes.section}>
                        <p className={classes.sectionContent}>
                            <ProjectTechnologies technologySet={project.technologySet} />
                        </p>
                    </div>
                    )}
                  <div className={classes.section}>
                    {project.description && Array.isArray(project.description) ? 
                        project.description.map((d, i)=>(
                            <p className={classes.description} key={`project_description_${i}`}>
                             {d}
                            </p>
                        )) : (  
                        <p className={classes.description} key={`project_description_${i}`}>
                            {project.description || project.shortDescription}
                        </p>)
                    }
                </div>
                    { pData && pData.media && pData.media.length > 0 && 
                    (
                        <div className={classes.section}>
                            <p className={classes.sectionHeader}>
                                Media
                            </p>
                            <p className={classes.sectionContent}>
                                <MediaReel 
                                    maxWidth={ 800 }
                                    width={ Math.min(Math.round(viewportWidth * 0.80), 800) }
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
                                <ButtonLink
                                    url={link}
                                    containerClass={classes.linkContainer}
                                    key={`project_sourcecode_${i}`}
                                >
                                    <i className={`mdi mdi-code-tags ${classes.linkIcon}`} />
                                    <p className={classes.linkText}>
                                        {project.sourceCodeDescriptions[i]}
                                    </p>
                                </ButtonLink>
                                ))}
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
                                <ButtonLink 
                                    url={link}
                                    containerClass={classes.linkContainer}
                                    key={`project_doclink_${i}`}
                                >
                                    <i className={`mdi mdi-note-outline ${classes.linkIcon}`} />
                                    <p className={classes.linkText}>
                                        {project.documentationDescriptions[i]}
                                    </p>
                                </ButtonLink>
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
                            <ButtonLink 
                                url={link} 
                                containerClass={classes.linkContainer}
                                key={`project_downloads_${i}`}
                            >
                                <i className={`mdi mdi-download ${classes.linkIcon}`} />
                                <p className={classes.linkText}>
                                    {project.downloadDescriptions[i]}
                                </p>
                            </ButtonLink>
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
                                <ButtonLink 
                                    url={link} 
                                    containerClass={classes.linkContainer}
                                    key={`project_links_${i}`}
                                >
                                            <i className={`mdi mdi-link ${classes.linkIcon}`} />
                                            <p className={classes.linkText}>
                                                {project.linkDescriptions[i]}
                                            </p>
                                </ButtonLink>
                                ))}
                            </p>
                        </div>
                    )}

                    <ButtonLink containerClass={ classes.returnContainer } url={`/projects`}>
                        <div className={classes.returnIcon}>
                            <div className={classes.returnIconContainer}>
                            <i className={`mdi mdi-arrow-left-box ${classes.linkIcon}`} />
                            </div>
                        </div>
                        <p className={ classes.returnText }>
                            Back to Projects
                        </p>
                    </ButtonLink>
                </div>
            </div>
        )
    })
);

let VisibleProjectView = connect(
    ({ core })=> ({ 
        theme         : core.theme,
        viewportWidth : core.viewportWidth 
    })
)(ProjectDetails);

export default VisibleProjectView