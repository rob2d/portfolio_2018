import { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import useViewportSizes from 'use-viewport-sizes';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ButtonLink, OptimizedImg, LoadingComponent } from 'utils/components';
import { useDocumentTitle, useAutoFaderClass, useLazyComponent } from 'utils/hooks';

const PREFIX = 'About';

const classes = {
    container: `${PREFIX}-container`,
    overview: `${PREFIX}-overview`,
    paragraphs: `${PREFIX}-paragraphs`,
    tech: `${PREFIX}-tech`,
    sphere: `${PREFIX}-sphere`,
    avatar: `${PREFIX}-avatar`,
    skillsOrb: `${PREFIX}-skillsOrb`,
    skillsContainer: `${PREFIX}-skillsContainer`
};

const Root = styled('div')(({
    theme: {
        palette: { secondary, common, text },
        breakpoints
    }
}) => ({
    [`&.${classes.container}`]: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 'min(1100px, 100vw)',
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        boxSizing: 'border-box', // for padding in landscape
        lineHeight: '1.3rem',
        textAlign: 'left',
        letterSpacing: '0.01rem',

        '& .MuiTypography-root': {
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: '0px',
            paddingBottom: '0px',
            wordWrap: 'break-word'
        },
        '& .MuiTypography-root:not(:last-child)': {
            marginBottom: '1em'
        },
        [breakpoints.up('sm')]: {
            flexDirection: 'row'
        }
    },

    [`& .${classes.overview}`]: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-evenly',
        [breakpoints.up('sm')]: {
            width: '25%',
            height: p => `calc(100vh - ${p.negativeContentH + 32}px)`,
            flexDirection: 'column-reverse'
        }
    },

    [`& .${classes.paragraphs}`]: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'inline-block',
        verticalAlign: 'top',
        textAlign: 'left',
        marginTop: '0px',
        marginBottom: '0px',
        [breakpoints.up('sm')]: {
            marginTop: '16px',
            marginBottom: '16px',
            maxHeight: p => `calc(100vh - ${p.negativeContentH + 32}px)`,
            overflowY: 'auto'
        }
    },

    [`& .${classes.tech}`]: {
        color: secondary.dark,
        '&:hover': { color: secondary.main },
        '&:active': { color: common.active },
        '&:not(:nth-last-child(-n+2)) .comma': { color: text.primary },
        '&:nth-last-child(-n+2) .comma': { display: 'none' }
    },

    [`& .${classes.sphere}`]: {
        boxSizing: 'border-box',
        width: 'min(max(96px, 40px + 6.2vw), 280px)',
        height: 'min(max(96px, 40px + 6.2vw), 280px)',
        flexShrink: '0',
        margin: '12px'
    },

    [`& .${classes.avatar}`]: {
        '& > *': {
            width: '100%',
            height: '100%',
            transform: 'scale(0.85)',
            top: '-8px'
        }
    },

    [`& .${classes.skillsOrb}`]: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },

    [`& .${classes.skillsContainer}`]: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '16px'
    }
}));

export default function About() {
    useDocumentTitle({ title: `${SITE_NAME} -- About` });
    const fadeContainerClass = useAutoFaderClass();
    const [vpW, vpH] = useViewportSizes();

    const [negativeContentH, setNegativeContentH] = useState(() => 0);

    // measure the header and footer to size the
    // remaining paragraph area

    useLayoutEffect(() => {
        const header = document.querySelector('[data-id=app-header]');
        const footer = document.querySelector('[data-id=app-footer]');

        setNegativeContentH(
            header.getBoundingClientRect().height +
            footer.getBoundingClientRect().height
        );
    }, [vpW, vpH]);



    const SkillsVisualizer = useLazyComponent(
        () => import( /* webpackChunkName: "skills-visualizer" */
            './skills-orbit/SkillsVisualizer')
            .then( m => ({ default: m.default }) ),
        <LoadingComponent size={ 32 } />
    );

    const Tech = useCallback(({ children, url }) => {
        Tech.displayName = 'Tech';

        return (
            <ButtonLink className={ classes.tech } url={ url } asButton={ false }>
                { children }
                <span className={ 'comma' }>, </span>
            </ButtonLink>
        );
    }, [classes.tech]);

    return (
        <Root className={ clsx(classes.container, fadeContainerClass) }>
            <div className={ classes.overview }>
                <div className={ classes.skillsContainer }>
                    <SkillsVisualizer className={ clsx(classes.sphere, classes.skillsOrb) } />
                </div>
                <div className={ clsx(classes.sphere, classes.avatar) }>
                    <Avatar>
                        <OptimizedImg src={ 'img/about/me.png' } alt={ 'Rob' } />
                    </Avatar>
                </div>
            </div>

            <div className={ classes.paragraphs }>
                <Typography variant={ 'body1' }>
                    Hi. My name is Rob. I am software developer from New York City.
                </Typography>
                <Typography variant={ 'body1' }>
                    This site was created using :&nbsp;
                    <Tech url={ 'https://reactjs.com' }>React</Tech>
                    <Tech url={ 'https://nodejs.org' }>Node</Tech>
                    <Tech url={ 'https://webpack.js.org/' }>Webpack</Tech>
                    and deployed via&nbsp;
                    <Tech url={ 'https://circleci.com/' }>CircleCI</Tech>&nbsp;
                    <Tech url={ 'http://nginx.org' }>NginX</Tech> and&nbsp;
                    <Tech url={ 'http://pm2.keymetrics.io/' }>PM2</Tech>.
                </Typography>
                <Typography variant={ 'body1' }>
                    A little about me and why this page exists: I have always been a curious
                    person, and grew up dabbling in hobbies related to software development.
                    This has included creating websites, videogames, and apps. This is just a
                    small subset of self-driven projects.
                </Typography>
                <Typography>
                    You probably won't find the most beautiful code on this
                    portfolio since I spend most of my energy at work,
                    on hobbies, or just being a human and doing those things
                    that they do and am perpetually trying to improve my skills...
                    but I do try to update here and there!
                </Typography>
                <Typography variant={ 'body1' }>
                    Intros aside, feel free to check out the other sections on
                    the top of this page.
                </Typography>
            </div>
        </Root>
    );
}
