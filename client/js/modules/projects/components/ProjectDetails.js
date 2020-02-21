import React, { useCallback } from 'react';
import useViewportSizes from 'use-viewport-sizes';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from '@mdi/react';
import {
    mdiArrowLeftBox,
    mdiNoteOutline,
    mdiCodeTags,
    mdiLink,
    mdiDownload
} from '@mdi/js';
import * as projects from 'data/projects';
import { ButtonLink } from 'utils/components';
import { useDocumentTitle, useAutoFaderClass } from 'utils/hooks';
import MediaReel from './media-reel/MediaReel';
import ProjectTechs from './ProjectTechs';

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
    return : {
        display : 'flex !important',
        maxWidth : '600px !important',
        margin : '40px 0px 16px !important',
        padding : '6px !important',
        textAlign : 'justify !important',
        alignItems : 'center !important',
        justifyContent : 'flex-start !important',
        fontSize : '13pt',
        '& p' : {
            display : 'inline-block',
            cursor : 'pointer',
            marginTop : '0px',
            marginBottom : '0px',
            textAlign : 'left',
            color : secondary.dark,
            fontWeight : 700,
            fontSize : '12pt'
        },
        '&:hover p' : {
            color : `${secondary.main} !important`
        },
        '&:active p' : {
            color : `${common.active} !important`
        },
        '& svg' : {
            fontSize : '22pt',
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            margin : '0px'
        }
    },
    section : {
        margin : '16px 0px 32px',
        color : text.primary,
        fill : text.primary
    },
    sectionHeader : {
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
    role : {
        fontSize : '14pt',
        paddingLeft : '8px',
        paddingRight : '16px',
        paddingTop : '8px',
        fontWeight : 700,
        textAlign : 'left'
    },
    link : {
        display : 'flex !important',
        flexDirection : 'row !important',
        alignItems : 'center !important',
        justifyContent : 'flex-start !important',
        '& p' : {
            margin : '12px 0px',
            padding : '0px',
            color : secondary.dark,
            fontSize : '12pt',
            fontWeight : 700,
            textAlign : 'left'
        },
        '&:hover p' : {
            color : `${secondary.main} !important`
        },
        '&:active p' : {
            color : `${common.active} !important`
        }
    },
    icon : {
        paddingRight : '16px',
        fill : text.primary,
        fontSize : '12pt'
    }
}));


export default function ProjectDetails({ projectId }) {
    const [vpW] = useViewportSizes();
    const classes = useStyles({ projectId, vpW });
    const fadeContainerClass = useAutoFaderClass(undefined, 1000);
    const p = projects[projectId];

    useDocumentTitle({ title : p.displayName && `${SITE_NAME} -- ${p.displayName}` });

    const LinkIcon = useCallback(({ path }) => (
        <Icon className={ classes.icon } size={ 0.9 } path={ path } />
    ), [classes.icon]);

    const Section = useCallback(({ title, children }) => children ? (
        <div className={ classes.section }>
            { title && (<p className={ classes.sectionHeader }>{ title }</p>) }
            <p className={ classes.sectionContent }>{ children }</p>
        </div>
    ) : (<></>),
    [classes.sectionHeader, classes.section, classes.sectionContent]);

    return (
        <div className={ clsx(classes.mainContainer, fadeContainerClass) }>
            <div className={ classes.contentContainer }>
                <div className={ classes.section }>
                    <p className={ classes.role }>{ p.roles }</p>
                </div>
                <Section>
                    { p.technologies?.length ? (
                        <div className={ classes.section }>
                            <p className={ classes.sectionContent }>
                                <ProjectTechs technologies={ p.technologies } />
                            </p>
                        </div>
                    ) : undefined }
                </Section>
                <Section>
                    { p.description?.length ? p.description.map((d, i) => (
                        <p className={ classes.description } key={ `desc${i+1}` }>
                            { d }
                        </p>
                    )) :
                    (
                        <p className={ classes.description } key={ `sdesc` }>
                            { p.description || p.shortDescription }
                        </p>
                    ) }
                </Section>
                <Section title={ 'Media' }>
                    { p.media?.items?.length ? (
                        <MediaReel
                            maxWidth={ vpW * 0.80 }
                            width={ Math.min(Math.round(vpW * 0.80), 800) }
                            aspectRatio={ p.media?.aspectRatio }
                            projectId={ projectId }
                            media={ p.media.items }
                        />
                    ) : undefined }
                </Section>
                <Section title={ 'Source Code' }>{ p.sourceCode?.length ?
                    p.sourceCode.map(({ url, description }) => (
                        <ButtonLink
                            url={ url }
                            className={ classes.link }
                            key={ `source_${url}` }
                        >
                            <LinkIcon path={ mdiCodeTags } />
                            <p>{ description }</p>
                        </ButtonLink>
                    )) : undefined }
                </Section>
                <Section title={ 'Documentation' }>{ p.documentation?.length ?
                    p.documentation.map(({ url, description }) => (
                        <ButtonLink url={ url } className={ classes.link } key={ url }>
                            <LinkIcon path={ mdiNoteOutline } />
                            <p>{ description }</p>
                        </ButtonLink>
                    )) : undefined }
                </Section>
                <Section title={ 'Downloads' }>{ p.downloads?.length ?
                    p.downloads.map(({ url, description }) => (
                        <ButtonLink
                            url={ url }
                            className={ classes.link }
                            key={ `downloads_${url}` }
                        >
                            <LinkIcon path={ mdiDownload } />
                            <p>{ description }</p>
                        </ButtonLink>
                    )) : undefined }
                </Section>
                <Section title={ 'Links' }>
                    { p.links?.length ? p.links.map(({ url, description }) => (
                        <ButtonLink
                            url={ url }
                            className={ classes.link }
                            key={ `links_${url}` }
                        >
                            <LinkIcon path={ mdiLink } />
                            <p>{ description }</p>
                        </ButtonLink>
                    )) : undefined }
                </Section>
                <ButtonLink className={ classes.return } url={ `/projects` }>
                    <LinkIcon path={ mdiArrowLeftBox } />
                    <p>Back to Projects</p>
                </ButtonLink>
            </div>
        </div>
    );
}
