import { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import clsx from 'clsx';
import useViewportSizes from 'use-viewport-sizes';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { ButtonLink, OptimizedImg, LoadingComponent } from 'utils/components';
import { useDocumentTitle, useAutoFaderClass, useLazyComponent } from 'utils/hooks';

const useStyles = makeStyles(({
    palette: { secondary, common, text },
    breakpoints
}) => ({
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 'min(1100px, 100vw)',
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
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
    overview: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-evenly',
        [breakpoints.up('sm')]: {
            width: '25%',
            height: p => `calc(100vh - ${p.negativeContentH + 32}px)`,
            flexDirection: 'column-reverse'
        }
    },
    paragraphs: {
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

    tech: {
        color: secondary.dark,
        '&:hover': { color: secondary.main },
        '&:active': { color: common.active },
        '&:not(:nth-last-child(-n+2)) .comma': { color: text.primary },
        '&:nth-last-child(-n+2) .comma': { display: 'none' }
    },
    sphere: {
        boxSizing: 'border-box',
        width: 'min(max(96px, 40px + 6.2vw), 280px)',
        height: 'min(max(96px, 40px + 6.2vw), 280px)',
        flexShrink: '0',
        margin: '12px'
    },
    avatar: {
        '& > *': {
            width: '100%',
            height: '100%',
            transform: 'scale(0.85)',
            top: '-8px'
        }
    },
    skillsOrb: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    skillsContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '16px'
    }
}), { name: 'About' });

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

    const classes = useStyles({ vpW, vpH, negativeContentH });

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
        <div className={ clsx(classes.container, fadeContainerClass) }>
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
                    I have always been a curious person, and grew up dabbling in hobbies related
                    to software development.&nbsp;
                    This has included creating websites, videogames, and apps. While&nbsp;
                    things here may be outdated and less polished, this is just a small subset&nbsp;
                    of self-driven projects (...that are not attached to NDAs).
                </Typography>
                <Typography>
                    I tend to spend most of my energy at work. And besides that,
                    sometimes hobbies and also being a human. I am perpetually
                    evolving my skillset, so it is tough not to be embarassed by
                    code I wrote yesterday... but I do try to update here and there!
                </Typography>
                <Typography variant={ 'body1' }>
                    Intros aside, feel free to check out the other sections on
                    the top of this page.
                </Typography>
            </div>
        </div>
    );
}
