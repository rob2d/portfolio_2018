import { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useViewportSizes from 'use-viewport-sizes';
import { OptimizedImg, ButtonLink } from 'utils/components';
import { Icon } from '@mdi/react';
import {
    mdiGamepadVariant,
    mdiMessageVideo,
    mdiMusic,
    mdiNote
} from '@mdi/js';
import {
    useDocumentTitle,
    useAutoFaderClass
} from 'utils/hooks';

const useStyles = makeStyles(({ palette: { common, secondary, type, text } }) => ({
    mainContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '700px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '16px',
        alignItems: 'center',
        boxSizing: 'border-box' // for padding in landscape
    },
    item: {
        padding: '16px',
        margin: '8px 0px',
        width: '300px'
    },
    bodyContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    imgBtn: {
        width: '100%'
    },
    articleImg: {
        position: 'relative',
        width: '80%',
        maxWidth: '300px',
        height: 'auto',
        minHeight: '190px',
        margin: '0 auto',
        display: 'block',
        filter: `invert(${(type == 'light') ? 0: 100}%)`,
        transition: 'filter 0.32s'
    },
    blurbs: {
        width: '292px',
        textAlign: 'left',
        margin: '0 auto',
        color: text.primary,
        transition: 'all 0.32s',
        '& > *:not(:last-child)': {
            marginBottom: '0.5rem'
        }
    },
    itemTitle: {
        display: 'flex',
        transition: 'color 0.2s',
        '&:hover $itemTitleText': {
            color: `${secondary.main} !important`
        },
        '&:active $itemTitleText': {
            color: `${common.active} !important`
        },
        '& svg': {
            display: 'flex',
            maxWidth: '32px',
            flexShrink: '0',
            marginLeft: '4px',
            marginRight: '12px',
            fill: text.primary,
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.32s'
        }
    },
    itemTitleText: {
        flexGrow: 1,
        textAlign: 'left',
        color: secondary.dark,
        marginTop: '0.5rem',
        marginBottom: '0.5rem'
    },

    // make certain things larger on non-mobile devices

    '@media (min-width:901px)': {
        mainContainer: {
            maxWidth: '1100px !important'
        }
    }
}), { name: 'Miscellaneous' });

export default function Miscellaneous() {
    useDocumentTitle({ title: `${SITE_NAME} -- Miscellaneous` });
    const [vpW, vpH] = useViewportSizes();
    const classes = useStyles({ vpW });
    const fadeContainerClass = useAutoFaderClass();
    const { palette } = useTheme();
    const disclaimerStyle = useMemo(() => ({
        color: palette.text.secondary, fontWeight: 600, fontStyle: 'italic'
    }), [palette]);

    const Blurbs = useCallback(({ blurbs }) => (
        <div className={ classes.blurbs }>{ blurbs.map((r,i) => (
            <Typography key={ `_${i+1}` } variant={ 'body1' }>
                { r }
            </Typography>
        )) }
        </div>
    ), [classes]);

    return (
        <div className={ clsx(classes.mainContainer, fadeContainerClass) }>
            <div className={ classes.bodyContent }>
                <div className={ classes.item }>
                    <ButtonLink
                        url={
                            'https://medium.com/@robftw/characteristics-of-' +
                            'an-ideal-react-architecture-883b9b92be0b'
                        }
                        className={ classes.imgBtn }
                    >
                        <OptimizedImg
                            src={ '/img/misc/rob_react_article_art.png' }
                            className={ classes.articleImg }
                        />
                    </ButtonLink>
                    <ButtonLink
                        url={
                            'https://medium.com/@robftw/characteristics-of-an-' +
                            'ideal-react-architecture-883b9b92be0b'
                        }
                        className={ classes.itemTitle }
                    >
                        <Icon path={ mdiNote } size={ 0.85 } />
                        <Typography
                            className={ classes.itemTitleText }
                            variant={ 'subtitle2' }
                        >Characteristics of an Ideal React Architecture
                        </Typography>
                    </ButtonLink>
                    <Blurbs blurbs={ [
                        `[note: the title is actually not serious, React is not an architecture in itself!]`,
                        `In this write-up, I clarify some misconceptions about React and identify central ` +
                        `characteristics that define a good use of React that large teams could adopt for easy ` +
                        `and lean scalability while cutting down on legacy cruft that is always inevitable. ` +
                        `A lot of this could be equally applicable for other Component-based view libraries on the web.`,

                        (<span style={ disclaimerStyle }>
                            <b>Note (Sep '19):</b> at this point in time, this
                            is pretty outdated from what I would recommend today
                            with a new project -- 80+% may hold true or be useful,
                            but thanks to new paradigms such as Hooks and functional
                            components and new context API, certain things such
                            as emphasis on immutability is a little bit out of
                            context in 2019.
                        </span>)
                    ] } />
                </div>
                <div className={ classes.item }>
                    <iframe
                        title={ 'JSSTalk' }
                        width={ '292' }
                        height={ '177' }
                        src={ 'https://www.youtube.com/embed/v1uJjYYvEPw' }
                        frameBorder={ '0' }
                        allow={ 'autoplay; encrypted-media' }
                        allowFullScreen
                    />
                    <ButtonLink
                        className={ classes.itemTitle }
                        url={ 'https://www.youtube.com/watch?v=v1uJjYYvEPw' }
                    >
                        <Icon path={ mdiMessageVideo } size={ 0.85 } />
                        <Typography
                            variant={ 'subtitle2' }
                            className={ classes.itemTitleText }
                        >JavaScript Styles in React: The Good Parts
                        </Typography>
                    </ButtonLink>
                    <Blurbs blurbs={ [
                        `A talk given at Spotify for ReactNYC which includes a presentation ` +
                        `that was completely written in React/JavaScript over a few days. `,

                        (<>
                            Synopsis:
                            <i>
                                When using React out of the box, we have two
                                styling workflow solutions to choose from:
                                traditional CSS stylesheets and using
                                inline-styles. This talk breaks down the issues
                                with these approaches and presents a more
                                React-friendly abstraction for CSS styling known
                                as JSS, and another called ReactJSS designed to
                                take that even further.
                            </i>
                        </>),
                        (
                            <span style={ disclaimerStyle }>
                                <b>Note (Sep '19):</b> while the technical things
                                presented still make sense and are accurate in
                                the browser, some benefits are understated or not
                                considered as <b>(1)</b> CSSinJS libraries were
                                rapidly evolving and&nbsp;<b>(2)</b> I was not fully
                                aware of some things which were possible (both
                                with CSS and with patterns).
                            </span>
                        )
                    ] } />
                </div>
                <div className={ classes.item }>
                    <iframe
                        title={ 'CCS' }
                        width={ '292' }
                        height={ '177' }
                        src={ 'https://www.youtube.com/embed/4KnJOvw9tLk' }
                        frameBorder={ '0' }
                        allow={ 'autoplay; encrypted-media' }
                        allowFullScreen
                    /><br />
                    <ButtonLink
                        className={ classes.itemTitle }
                        url={ 'https://www.youtube.com/watch?v=4KnJOvw9tLk' }
                    > <Icon path={ mdiGamepadVariant } size={ 0.85 } />
                        <Typography
                            variant={ 'subtitle2' }
                            className={ classes.itemTitleText }
                        >Crazy Cabbie Sonic
                        </Typography>
                    </ButtonLink>

                    <Blurbs blurbs={ [
                        `One of the first pieces of software I ever completed in
                        middleschool -- around 2000; Not proud of it for any
                        objective sense of quality, but it was actually fun
                        little 72 hour flurry and and became a bit popular
                        online at the time.`
                    ] } />
                </div>
                <div className={ classes.item }>
                    <iframe
                        title={ 'Soundcloud' }
                        width={ '292' }
                        height={ '100' }
                        scrolling={ 'no' }
                        frameBorder={ 'no' }
                        allow={ 'autoplay' }
                        src={
                            'https://w.soundcloud.com/player/?url=https%3A//' +
                            'api.soundcloud.com/tracks/41838495&color=%23ff55' +
                            '00&auto_play=false&hide_related=false&show_commen' +
                            'ts=true&show_user=true&show_reposts=false&show_tea' +
                            'ser=true&visual=true'
                        } />
                    <br />
                    <ButtonLink
                        url={ 'https://soundcloud.com/rob2d/high-wires-in-space' }
                        className={ classes.itemTitle }
                    >
                        <Icon path={ mdiMusic } size={ 0.85 } />
                        <Typography
                            variant={ 'subtitle2' }
                            className={ classes.itemTitleText }
                        >ColorShafted: Highwires in Space
                        </Typography>
                    </ButtonLink>
                    <Blurbs blurbs={ [
                        `In college, I wrote a game engine as a reason to learn
                        Java in depth without killing myself with boredem after
                        learning C, and released a few Android apps on a budget.
                        Naturally you need music to go with any game, and this
                        became a small hobby of mine that I shared with some
                        friends during the time. This was one of the results of
                        that.`
                    ] } />
                </div>
                {(vpW > 1036) && (
                    <>
                        <div className={ classes.item } />
                        <div className={ classes.item } />
                    </>
                ) }
            </div>
        </div>
    );
}
