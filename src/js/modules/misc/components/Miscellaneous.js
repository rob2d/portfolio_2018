import React, { Component } from 'react'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import injectSheet from 'react-jss'
import { misc as strings } from 'strings'

const styleSheet = {
    mainContainer : {
        marginLeft     : 'auto',
        marginRight    : 'auto',
        maxWidth       : '700px',
        flexGrow       : 1,
        display        : 'flex',
        flexDirection  : 'column',
        justifyContent : 'center',
        padding        : '16px',
        alignItems     : 'center',
        boxSizing      : 'border-box' // for padding in landscape
    },
    item : {
        padding  : '16px 0px',
        margin   : '8px auto',
        maxWidth : '300px !important'
    },
    sig : {
        textAlign   : 'right !important',
        marginRight : '72px !important'
    },
    avatar : {
        width  : '128px',
        height : '128px',
        margin : '32px auto'
    },
    bodyContent : {
        flexGrow      : 1,
        display       : 'flex',
        flexDirection : 'row',
        flexWrap      : 'wrap'
    },
    articleImg : {
        width     : '80%',
        maxWidth  : '300px',
        height    : 'auto',
        minHeight : '190px',
        margin    : '0 auto',
        display   : 'block'
    },
    rambling : {
        padding   : '8px 0px',
        width     : '292px',
        textAlign : 'justify',
        margin    : '0 auto'
    },
    itemTitle : {
        display      : 'flex',
        direction    : 'row',
        paddingLeft  : '8px',
        paddingRight : '8px'
    },
    itemTitleText : {
        flexGrow     : 1,
        textAlign    : 'left',
        fontFamily   : 'roboto_bold',
        color        : '#c51162'
    },
    itemTypeIcon : {
        display        : 'flex',
        maxWidth       : '32px',
        marginRight    : '16px',
        color          : '#000000',
        alignItems     : 'center',
        justifyContent : 'center'
    },

    '@media (max-width: 700px) and (min-width : 341px) and (orientation:portrait)': {
        // don't want the avatar to dominate the 
        // mobile screen :)
        avatar : {
            margin : '24px auto 16px !important',
            width  : '116px !important',
            height : '116px !important'
        }
    },
    '@media (max-width: 340px) and (orientation:portrait)': {
        // accomodations for micro phones like iP5
        avatar : {
            margin : '16px auto 8px !important',
            width  : '80px !important',
            height : '80px !important'
        }
    },
    '@media (orientation:landscape)': {
        avatar : {
            margin      : '16px 16px 8px !important',
            marginLeft  : '16px',
            marginRight : '16px'
        }
    },
    // for general mobile devices in landscape
    '@media (orientation:landscape) and (max-width:900px)': {
        avatar : {
            width  : '80px !important',
            height : '80px !important',
        }
    },

    // make certain things larger on non-mobile devices
    
    '@media (min-width:901px)' : {

        avatar : {
            width  : '180px !important',
            height : '180px !important'
        },
        
        mainContainer : {
            maxWidth : '1100px !important'
        }
    }
};

function Miscellaneous ({ classes }) {
    return (
        <div className={classes.mainContainer}>
            <div className={classes.bodyContent}>
                <div className={classes.item}>
                    <a href="https://medium.com/@robftw/characteristics-of-an-ideal-react-architecture-883b9b92be0b">
                        <img src={ '/img/misc/rob_react_article_art.png' } className={ classes.articleImg } />
                        <div className={classes.itemTitle}>
                            <i className={`mdi mdi-note ${classes.itemTypeIcon}`} /> 
                            <p className={classes.itemTitleText}>
                                Characteristics of an Ideal React Architecture
                            </p>
                        </div>
                    </a>
                    <p className={classes.rambling}>
                        In this write-up, I clarify some misconceptions about React and identify central 
                        characteristics that define a good use of React that large teams could adopt for easy 
                        and lean scalability while cutting down on legacy cruft that is always inevitable. 
                        A lot of this could be equally applicable for other Component-based view libraries on the web.
                    </p>
                    <p className={classes.rambling}>
                        [note: the title is actually not serious, React is not an architecture in itself!]
                    </p>

                </div>
                <div className={classes.item}>
                    <iframe 
                        width="292" 
                        height="177" 
                        src="https://www.youtube.com/embed/v1uJjYYvEPw" 
                        frameBorder="0" 
                        allow="autoplay; encrypted-media" 
                        allowFullScreen >
                    </iframe>
                    <a href={'https://www.youtube.com/watch?v=v1uJjYYvEPw'}>
                        <div className={classes.itemTitle}>
                            <i className={`mdi mdi-message-video ${classes.itemTypeIcon}`} /> 
                            <p className={classes.itemTitleText}>
                                JavaScript Styles in React : The Good Parts
                            </p>
                        </div>
                    </a>
                    <p className={classes.rambling}>
                        A talk given at Spotify for ReactNYC which includes a presentation that 
                        was completely written in React/JavaScript over a few days. 
                    </p>
                    <p className={classes.rambling}>
                        Synopsis: 
                        "<i>When using React out of the box, 
                        we have two styling workflow solutions to choose from: traditional CSS 
                        stylesheets and using inline-styles. This talk breaks down the issues 
                        with these approaches and presents a more React-friendly abstraction for 
                        CSS styling known as JSS, and another called ReactJSS designed to take 
                        that even further.</i>"
                    </p>
                </div>
                <div className={classes.item}>
                    <iframe 
                        width="292" 
                        height="177" 
                        src="https://www.youtube.com/embed/4KnJOvw9tLk" 
                        frameBorder="0" 
                        allow="autoplay; encrypted-media" 
                        allowFullScreen
                    ></iframe><br />
                    <a href={'https://www.youtube.com/watch?v=4KnJOvw9tLk'}>
                        <div className={classes.itemTitle}>
                            <i className={`mdi mdi-gamepad-variant ${classes.itemTypeIcon}`} /> 
                            <p className={classes.itemTitleText}>
                                Crazy Cabbie Sonic
                            </p>
                        </div>
                    </a>
                    <p className={classes.rambling}>
                        One of the first pieces of software I ever completed in middleschool -- around 2000; 
                        Not proud of it for any objective sense of quality, but it was actually fun little 72 hour flurry and
                        and became a bit popular online at the time.
                    </p>
                </div>
                <div className={classes.item}>
                    <iframe 
                        width="292" 
                        height="100" 
                        scrolling="no" 
                        frameborder="no" 
                        allow="autoplay" 
                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/41838495&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
                    </iframe><br />
                    <a href="https://soundcloud.com/rob2d/high-wires-in-space">
                        <div className={classes.itemTitle}>
                            <i className={`mdi mdi-music ${classes.itemTypeIcon}`} />
                            <p className={classes.itemTitleText}>
                                ColorShafted: Highwires in Space
                            </p>
                        </div>
                    </a>

                    <p className={classes.rambling}>
                        In college, I wrote a game engine as a reason to learn Java in depth without
                        killing myself with boredem after learning C, and released
                        a few Android apps on a budget. 
                        Naturally you need music to go with any game, and this became a small
                        hobby of mine that I shared with some friends during the time. 
                        This was one of the results of that.
                    </p>
                </div>
            </div>
        </div>
    );
};

let VisibleMisc = pure(injectSheet(styleSheet)(connect(
    (state,ownProps)=> ({ language : state.core.language }),
    null
)(Miscellaneous)));

export default VisibleMisc