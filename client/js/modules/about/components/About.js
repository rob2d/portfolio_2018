import React, { useMemo, useCallback } from 'react';
import clsx from 'clsx';
import useViewportSizes from 'use-viewport-sizes';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { isPortrait } from 'utils';
import { ButtonLink, OptimizedImg } from 'utils/components';
import { useDocumentTitle, useAutoFaderClass } from 'utils/hooks';
import SectionLinks from './SectionLinks';

const useStyles = makeStyles(({ palette: { secondary, common, text } }) => ({
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '700px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: p => `${!p.inPortrait ?0:16}px`,
        alignItems: 'center',
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

        '& > div:nth-of-type(1)': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between'
        },

        '& > div:nth-of-type(2)': {
            display: 'inline-block',
            verticalAlign: 'top',
            textAlign: 'left',
        }
    },

    tech: {
        color: secondary.dark,

        '&:hover': { color: secondary.main },

        '&:active': { color: common.active },

        // commas following tech
        '&:not(:nth-last-child(-n+2)) $techComma': {
            color: text.primary
        },
        '&:nth-last-child(-n+2) $techComma': {
            display: 'none'
        }
    },
    techComma: {},
    avatar: {
        width: '128px',
        height: '128px',
        margin: '32px'
    },
    skillsOrbit: {
        display: 'none',
        position: 'relative',
        width: '30vh',
        height: '30vh'
    },
    // don't want the avatar to dominate the mobile screen:
    ['@media (max-width: 700px) and (min-width : 341px) ' +
    'and (orientation:portrait)']: {
        avatar: {
            width: '116px',
            height: '116px'
        }
    },
    // accomodations for micro phones like iP5
    '@media (max-width: 340px) and (orientation:portrait)': {
        avatar: {
            margin: '16px auto 8px',
            width: '80px',
            height: '80px'
        }
    },
    '@media (orientation:landscape)': {
        avatar: {
            margin: '16px 16px 8px'
        },
        container: {
            padding: '16px',
            boxSizing: 'border-box'
        }
    },
    // for general mobile devices in landscape
    '@media (orientation:landscape) and (max-width:900px)': {
        avatar: {
            margin: '24px 8px',
            width: '80px',
            height: '80px',
        }
    },
    // make certain things larger on non-mobile devices
    '@media (min-width:901px)': {
        avatar: {
            width: '120px',
            height: '120px'
        },
        container: {
            justifyContent: 'space-evenly',
            maxWidth: '1280px'
        }
    }
}), { name: 'About' });

export default function About() {
    useDocumentTitle({ title: `${SITE_NAME} -- About` });
    const fadeContainerClass = useAutoFaderClass();
    const [vpW, vpH] = useViewportSizes();
    const linkProps = useMemo(() => ({ vpW, vpH }), [vpW, vpH]);
    const inPortrait = useMemo(() => isPortrait(vpW, vpH), [vpW, vpH]);
    const classes = useStyles({ vpW, vpH, inPortrait });

    const Tech = useCallback(({ children, url }) => {
        Tech.displayName = 'Tech';
        return (
            <ButtonLink
                className={ classes.tech }
                url={ url }
                asButton={ false }
            >   { children }
                <span className={ classes.techComma }>, </span>
            </ButtonLink>
        );
    }, [classes.tech]);

    return (
        <div className={ clsx(classes.container, fadeContainerClass) }>
            <div>
                <Avatar className={ classes.avatar }>
                    <OptimizedImg src={ 'img/about/me.jpg' } alt={ 'Rob' } />
                </Avatar>
                <SectionLinks { ...linkProps } />
            </div>

            <div>
                <Typography variant={ 'body1' }>
                    Hi. My name is Rob, and I am a software developer from New York City.
                    Thanks for visiting.
                </Typography>
                <Typography variant={ 'body1' }>
                    This site was created using my stack of choice most days:&nbsp;
                    <Tech url={ 'https://reactjs.com' }>React</Tech>
                    <Tech url={ 'https://nodejs.org' }>Node</Tech>
                    <Tech url={ 'https://webpack.js.org/' }>Webpack</Tech>
                    and deployed via&nbsp;
                    <Tech url={ 'http://nginx.org' }>NginX</Tech> and&nbsp;
                    <Tech url={ 'http://pm2.keymetrics.io/' }>PM2</Tech>.
                    I am perpetually evolving my workflow, and it because of the nature
                    of this website being written outside of my main work or projects,
                    it is difficult to keep this up to date; hopefully
                    things are not aging too badly here 🙃
                </Typography>
                <Typography variant={ 'body1' }>
                    A little about me and why this page exists: I have always
                    been a curious person and grew up dabbling in
                    introverted hobbies which includes creating websites,
                    videogames, apps, and making cool things. None of that has changed,
                    and this site is a small collection of mostly
                    self-driven projects that I wish I had more time to devote
                    to (the ones which made it somewhere beyond the drawing board).
                    You probably won't find the most beautiful code on this
                    portfolio since I spend most of my energy at work,
                    on hobbies, or just being a human and doing those things
                    that they do. But I do try to update here and there!
                </Typography>
                <Typography variant={ 'body1' }>
                    My background: I joined the Navy as an Electronic Technician
                    out of highschool to get some practical experience,
                    make the best of my situation, and take the more
                    scenic route and so that I could also devote a lot of
                    undivided attention to my studies and projects. Since
                    completing graduate school in Computer Science, I have
                    gotten to work in a variety of industries at various
                    capacities including power/skyscraper infrastructure
                    mapping and management, intellectual property, virtual
                    reality tours, finance, as well as consistently on my own
                    side projects which include development tools and small
                    applications.
                </Typography>
                <Typography variant={ 'body1' }>
                    Intros aside, feel free to check out the other sections here
                    which should hopefully be a lot more interesting!
                </Typography>
            </div>
        </div>
    );
}
