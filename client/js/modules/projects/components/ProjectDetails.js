import React, { useMemo, useCallback } from 'react';
import useViewportSizes from 'use-viewport-sizes';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { projects } from 'strings';
import { withFadeTransitions } from 'utils';
import { ButtonLink } from 'utils/components';
import MediaReel from './media-reel/MediaReel';
import ProjectTechs from './ProjectTechs';
import projectsData from 'app-root/data/projectsData';
import { Icon } from '@mdi/react';
import {
    mdiArrowLeftBox,
    mdiNoteOutline,
    mdiCodeTags,
    mdiLink,
    mdiDownload
} from '@mdi/js';

const findProjectStrings = projectId => (
    projects.projectData.find( 
        p => p.id == projectId 
    )
);

const useStyles = makeStyles(({ palette : { common, text, secondary } }) => ({
    mainContainer : {
        flexGrow : 1,
        margin : '0 auto',
        textAlign : 'left',
        maxWidth : '1024px',
        marginTop : '96px',
        paddingLeft : '32px',
        paddingRight : '32px',
        paddingBottom : '16px',
        marginBottom : '16px'
    },

    '@media (max-width:800px)' : {
        mainContainer : {
            paddingLeft : '16px',
            paddingRight : '16px'
        }
    },
    '@media (max-width:400px)' : {
        mainContainer : {
            paddingLeft : '12px !important',
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
        fontSize : '13pt',
        textAlign : 'left',
        paddingLeft : '16px',
        paddingRight : '16px',
        color : text.primary
    },

    // only on tablet sized device+ or certain
    // large screens in landscape should we
    // begin to justify text
    
    '@media (min-width:800px)' : {
        description : {
            textAlign : 'justify !important'
        }
    },
    screenshotsectionHeader : {
        textPadding : '16px',
        textAlign : 'left',
        fontSize : '16pt',
        marginBottom : '0px'
    },
    screenshots : {
        display : 'inline-block',
        width : 'calc(100vw-64px)',
        height : 'auto',
        margin : '16px',
        borderTop : `${text.primary} 2px solid`,
        borderBottom : `${text.primary} 2px solid`
    },
    screenshot : {
        minWidth : '56px',
        width  : 'auto',
        height : '56px',
        margin : '16px 8px'
    },
    returnContainer : {
        display : 'flex !important',
        maxWidth : '600px !important',
        margin : '40px 0px 16px !important',
        padding : '6px !important',
        textAlign : 'justify !important',
        alignItems : 'center !important',
        justifyContent : 'flex-start !important',
        fontSize : '13pt',
        '&:hover $returnText' : {
            color : `${secondary.main} !important`
        },
        '&:active $returnText' : {
            color : `${common.active} !important`
        }
    },
    returnIcon : {
        fontSize : '22pt',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        margin : '0px',
        color : '#0000CC'
    },
    returnText : {
        display : 'inline-block',
        cursor : 'pointer',
        marginTop : '0px',
        marginBottom : '0px',
        fontSize : '14pt',
        textAlign : 'left',
        color : secondary.dark,
        fontFamily : 'roboto_bold',
        fontSize : '12pt'
    },
    section : {
        margin : '16px 0px 32px',
        color : text.primary
    },
    sectionHeader : {
        fontFamily : 'roboto_bold',
        fontSize : '14pt',
        fontWeight : 700,
        textAlign : 'left',
        margin : '16px 0px'
    },
    sectionContent : {
        fontSize : '13pt',
        textAlign : 'left',
        paddingLeft : '16px',
        paddingRight : '16px',
        marginTop : '0px'
    },
    sectionRole : {
        fontSize : '14pt',
        paddingLeft : '8px',
        paddingRight : '16px',
        paddingTop : '8px',
        fontWeight : 'bold',
        textAlign : 'left',
        fontFamily : 'roboto_bold'
    },
    linkContainer : {
        display : 'flex !important',
        flexDirection : 'row !important',
        alignItems : 'center !important',
        justifyContent : 'flex-start !important',
        '&:hover $linkText' : {
            color : `${secondary.main} !important`
        },
        '&:active $linkText' : {
            color : `${common.active} !important`
        }
    },
    bulletLink : {
        width : '100%'
    },
    icon : {
        paddingRight : '16px',
        fill : text.primary,
        fontSize : '12pt'
    },
    // TODO : use a global style/theme for this,
    linkText : {
        margin : '12px 0px',
        padding : '0px',
        color : secondary.dark,
        fontFamily : 'roboto_bold',
        fontSize : '12pt',
        textAlign : 'left'
    }
}));

export default withFadeTransitions(
    function ProjectDetails ({ projectId, fadeContainerClass }) { 
        const [vpW, vpH] = useViewportSizes();
        const classes = useStyles({ projectId, vpW });

        const {
            mediaCaptions,
            roles,
            techSet,
            description,
            shortDescription,
            linkDescriptions,
            sourceCodeDescriptions,
            downloadDescriptions,
            documentationDescriptions,
            mediaAspectRatio
        } = findProjectStrings(projectId);
        
        const { 
            media, 
            downloads, 
            sourceCode, 
            documentation,
            links,
        } = projectsData[projectId];

        const mediaItems = useMemo(()=> (
            media?.length && mediaCaptions?.length ? (
                media.map((m,i)=> 
                    ({ ...m, caption : mediaCaptions[i] })
                )) : media
        ), [media, mediaCaptions]);

        const LinkIcon = useCallback(({ path }) => (
            <Icon
                className={ classes.icon }
                size={ 0.9 }
                path={ path }
            />
        ), [classes.icon]);
        
        return (
            <div className={ clsx(classes.mainContainer, fadeContainerClass) }>
                <div className={ classes.contentContainer }>
                    <div className={ classes.section }>
                        <p className={ classes.sectionRole }>
                            { roles }
                        </p>
                    </div>
                    { techSet?.size ? (
                        <div className={ classes.section }>
                            <p className={ classes.sectionContent }>
                                <ProjectTechs techSet={ techSet } />
                            </p>
                        </div>
                    ) : (<></>) }
                    <div className={ classes.section }>
                    { description?.length ? 
                        description.map((d, i)=> (
                            <p 
                                className={ classes.description } 
                                key={ `description_${i}` }
                            >{ d }
                            </p>
                        )) :
                        (  
                            <p 
                                className={ classes.description } 
                                key={ `sdescription_${i}` }>
                                { description || shortDescription }
                            </p>
                        )
                    }
                    </div>
                    { media?.length ?
                    (
                        <div className={ classes.section }>
                            <p className={ classes.sectionHeader }>Media</p>
                            <p className={ classes.sectionContent }>
                                <MediaReel 
                                    maxWidth={ vpW * 0.80 }
                                    width={ Math.min(Math.round(vpW * 0.80), 800) }
                                    aspectRatio={ mediaAspectRatio }
                                    projectId={ projectId }
                                    media={ mediaItems }
                                />
                            </p>
                        </div>
                    ) : (<></>) }
                    { sourceCode?.length ? (
                        <div className={ classes.section }>
                            <p className={ classes.sectionHeader }>
                                Source Code
                            </p>
                            <p className={ classes.sectionContent }>
                                { sourceCode.map((link,i)=>(
                                    <ButtonLink
                                        url={ link }
                                        containerClass={ classes.linkContainer }
                                        key={ `sourcecode_${i}` }
                                    >
                                        <LinkIcon path={ mdiCodeTags } />
                                        <p className={ classes.linkText }>
                                            { sourceCodeDescriptions[i] }
                                        </p>
                                    </ButtonLink>
                                )) }
                            </p>
                        </div>
                    ) : <></> }
                    { documentation ? (
                        <div className={ classes.section }>
                            <p className={ classes.sectionHeader }>
                                Documentation
                            </p>
                            <p className={ classes.sectionContent }>
                                { documentation.map((link, i)=>(
                                <ButtonLink 
                                    url={ link }
                                    containerClass={ classes.linkContainer }
                                    key={ `doclink_${i}` }
                                >
                                    <LinkIcon path={ mdiNoteOutline } />
                                    <p className={ classes.linkText }>
                                        { documentationDescriptions[i] }
                                    </p>
                                </ButtonLink>
                                )) }
                            </p>
                        </div>
                    ) : (<></>) }
                    { downloads ? (
                        <div className={ classes.section }>
                            <p className={ classes.sectionHeader }>
                                Downloads
                            </p>
                            <p className={ classes.sectionContent }>
                                { downloads.map((link, i)=>(
                                <ButtonLink 
                                    url={ link } 
                                    containerClass={ classes.linkContainer }
                                    key={ `project_downloads_${i}` }
                                >
                                    <LinkIcon path={ mdiDownload } />
                                    <p className={ classes.linkText }>
                                        { downloadDescriptions[i] }
                                    </p>
                                </ButtonLink>
                                )) }
                            </p>
                        </div>
                    ) : (<></>)}
                    { links ? (
                        <div className={ classes.section }>
                            <p className={ classes.sectionHeader }>Links</p>
                            <p className={ classes.sectionContent }>
                                { links.map((link, i)=>(
                                    <ButtonLink 
                                        url={ link } 
                                        containerClass={ classes.linkContainer }
                                        key={ `project_links_${i}` }
                                    >
                                        <LinkIcon path={ mdiLink } />
                                        <p className={ classes.linkText }>
                                            { linkDescriptions[i] }
                                        </p>
                                    </ButtonLink>
                                )) }
                            </p>
                        </div>
                    ) : (<></>) }

                    <ButtonLink 
                        containerClass={ classes.returnContainer } 
                        url={`/projects`}
                    >
                        <div className={ classes.returnIcon }>
                            <LinkIcon path={ mdiArrowLeftBox } />
                        </div>
                        <p className={ classes.returnText }>
                            Back to Projects
                        </p>
                    </ButtonLink>
                </div>
            </div>
        );
})