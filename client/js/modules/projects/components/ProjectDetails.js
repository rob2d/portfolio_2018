import React, { useCallback } from 'react';
import useViewportSizes from 'use-viewport-sizes';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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

const linkItemSections = [
    { field: 'sourceCode', iconPath: mdiCodeTags },
    { field: 'documentation', iconPath: mdiNoteOutline },
    { field: 'downloads', iconPath: mdiDownload },
    { field: 'links', iconPath: mdiLink }
];

const useStyles = makeStyles(({ palette: { common, text, primary, secondary } }) => ({
    mainContainer: {
        flexGrow: 1,
        margin: '0 auto',
        textAlign: 'left',
        maxWidth: '1024px',
        marginTop: '64px',
        paddingLeft: '32px',
        paddingRight: '32px',
        paddingBottom: '16px',
        marginBottom: '16px'
    },

    '@media (max-width:800px)': {
        mainContainer: {
            paddingLeft: '16px',
            paddingRight: '16px'
        }
    },
    '@media (max-width:400px)': {
        mainContainer: {
            paddingLeft: '12px !important',
            paddingRight: '12px !important'
        }
    },
    contentContainer: {
        margin: '16px 0px',
        paddingLeft: '16px',
        paddingRight: '16px'
    },
    description: {
        textAlign: 'left',
        paddingLeft: '16px',
        paddingRight: '16px',
        color: text.primary,
        '&:not(:last-of-type)' : {
            marginBottom: '1em'
        }
    },

    // only on tablet sized device+ or certain
    // large screens in landscape should we
    // begin to justify text

    '@media (min-width:800px)': {
        description: {
            textAlign: 'justify !important'
        }
    },
    return: {
        display: 'flex !important',
        maxWidth: '600px !important',
        margin: '40px 0px 16px',
        padding: '6px',
        textAlign: 'justify',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '& p': {
            display: 'inline-block',
            cursor: 'pointer',
            marginTop: '0px',
            marginBottom: '0px',
            textAlign: 'left',
            color: secondary.dark,
            fontWeight: 700
        },
        '&:hover p': {
            color: `${secondary.main} !important`
        },
        '&:active p': {
            color: `${common.active} !important`
        },
        '& svg': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0px'
        }
    },
    section: {
        color: text.primary,
        fill: text.primary,
        marginBottom: '16px'
    },
    sectionHeader: {
        fontSize: '14pt',
        fontWeight: 700,
        textAlign: 'left',
        margin: '16px 0px'
    },
    sectionContent: {
        paddingLeft: '16px',
        paddingRight: '16px',
        marginTop: '0px'
    },
    role: {
        paddingRight: '16px',
        paddingTop: '8px',
        fontWeight: 700,
        textAlign: 'left'
    },
    chevron: {
        color: secondary.main
    },
    link: {
        display: 'flex !important',
        flexDirection: 'row !important',
        alignItems: 'center !important',
        justifyContent: 'flex-start',
        '& p': {
            margin: '12px 0px',
            padding: '0px',
            color: secondary.dark,
            fontSize: '12pt',
            fontWeight: 700,
            textAlign: 'left'
        },
        '&:hover p': {
            color: secondary.main
        },
        '&:active p': {
            color: common.active
        }
    },
    icon: {
        paddingRight: '16px',
        fill: text.primary,
        fontSize: '12pt'
    }
}), { name: 'ProjectDetails' });

export default function ProjectDetails({ projectId }) {
    const [vpW] = useViewportSizes();
    const classes = useStyles({ projectId, vpW });
    const fadeContainerClass = useAutoFaderClass(undefined, 1000);
    const p = projects[projectId];
    useDocumentTitle({ title: p.displayName && `${SITE_NAME} -- ${p.displayName}` });

    const LinkItem = useCallback(({ url, iconPath, children }) => (
        <ButtonLink url={ url } className={ classes.link } key={ url }>
            <Icon className={ classes.icon } size={ 0.9 } path={ iconPath } />
            <Typography variant={ 'body1' }>{ children }</Typography>
        </ButtonLink>
    ), [classes.link, classes.icon]);

    const Section = useCallback(({
        title, children, linkItems, linkIconPath
    }) => {
        if(!children && !linkItems?.length) { return (<></>) }

        return (
            <div className={ classes.section }>
                { title && (
                    <Typography
                        variant={ 'h4' }
                        className={ classes.sectionHeader }
                    >{ title }
                    </Typography>
                ) }
                <div className={ classes.sectionContent }>
                    { children }
                    { linkItems?.length ? linkItems.map(({ url, description }) => (
                        <LinkItem iconPath={ linkIconPath } url={ url } key={ url }>
                            { description }
                        </LinkItem>
                    )) : undefined }
                </div>
            </div>
        );
    }, [classes.sectionHeader, classes.section, classes.sectionContent]);

    return (
        <div className={ clsx(classes.mainContainer, fadeContainerClass) }>
            <div className={ classes.contentContainer }>
                <div className={ classes.section }>
                    <Typography className={ classes.role } variant={ 'h5' }>
                        <span className={ classes.chevron }>&#9656;</span>&nbsp;&nbsp;
                        { p.roles }
                    </Typography>
                </div>
                <div className={ classes.sectionContent }>
                    { !p.technologies?.length ? undefined : (
                        <ProjectTechs technologies={ p.technologies } />
                    ) }
                </div>
                <Section>
                    { p.description?.length ? p.description.map((d, i) => (
                        <Typography
                            variant={ 'body1' }
                            className={ classes.description }
                            key={ `desc${i+1}` }
                        >{ d }
                        </Typography>
                    )) : (
                        <Typography
                            variant={ 'body1' }
                            className={ classes.description }
                            key={ `sdesc` }
                        >{ p.description || p.shortDescription }
                        </Typography>
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
                { linkItemSections.map(({ field, iconPath }) => (
                    <Section
                        title={
                            field.charAt(0).toUpperCase() +
                            field.replace(/([A-Z])/g, match => ` ${match}`).substring(1)
                        }
                        linkItems={ p[field] }
                        linkIconPath={ iconPath }
                    />
                )) }
                <ButtonLink className={ classes.return } url={ `/projects` }>
                    <Icon
                        className={ classes.icon }
                        size={ 0.9 }
                        path={ mdiArrowLeftBox }
                    />
                    <Typography variant={ 'body1' }>Back to Projects</Typography>
                </ButtonLink>
            </div>
        </div>
    );
}
