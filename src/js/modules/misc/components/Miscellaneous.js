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
    pText : {
        paddingLeft  : '16px',
        paddingRight : '16px',
        textAlign    : 'left'
    },
    wipNote : {
        fontStyle : 'italic',
        fontSize : '10pt !important'
    },
    sig : {
        textAlign : 'right !important',
        marginRight : '72px !important'
    },
    avatar : {
        width  : '128px',
        height : '128px',
        margin : '32px auto'
    },
    bodyContent : {
        flexGrow : 1
    },
    articleImg : {
        width : '80%',
        maxWidth : '300px',
        height : 'auto',
        margin : '0 auto'
    },
    '@media (max-width: 700px) and (min-width : 341px) and (orientation:portrait)': {
        // don't want the avatar to dominate the 
        // mobile screen :)
        avatar : {
            margin : '24px auto 16px !important',
            width : '116px !important',
            height: '116px !important'
        }
    },
    '@media (max-width: 340px) and (orientation:portrait)': {
        // accomodations for micro phones like iP5
        avatar : {
            margin : '16px auto 8px !important',
            width : '80px !important',
            height: '80px !important'
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
        },
        pText : {
            fontSize : '11pt'
        }
    },

    // again, for iPhone 5

    '@media (orientation:landscape) and (max-height:320px)': {
        pText : {
            marginTop    : '8px',
            marginBottom : '8px'
        }
    },

    // make certain things larger on non-mobile devices
    
    '@media (min-width:901px)' : {

        avatar : {
            width : '180px !important',
            height: '180px !important'
        },
        
        mainContainer : {
            maxWidth : '800px !important'
        },
        
        pDisclaimer : {
            paddingLeft  : '32px !important',
            paddingRight : '32px !important',
            paddingBottom : '8px',
            paddingTop    : '8px',
            fontSize     : '14pt !important',
            fontStyle    : 'italic',
            textAlign    : 'center',
            color : 'rgba(255,255,255,1)',
            backgroundColor : 'rgba(100,100,100)',
            fontSize : '11pt'
        },
        
        wipNote : {
            fontSize : '12pt !important'
        },

        rambling : {
            border   : '1px solid #000000',
            padding  : '8px',
            fontSize : '10pt',
            backgroundColor : '#DFDFDF'
        }

    }
};

function Miscellaneous ({ classes }) {
    return (
        <div className={classes.mainContainer}>
            <div className={classes.bodyContent}>
                <p className={classes.pDisclaimer}>
                ⚠ &nbsp;&nbsp;&nbsp;&nbsp;8/26 Note: this is super W.I.P. and yep... I agree, looks pretty terrible. 🙃 
                </p><br />
                <p>
                    <a href="https://medium.com/@robftw/characteristics-of-an-ideal-react-architecture-883b9b92be0b">
                        <img src={ '/img/misc/rob_react_article_art.png' } className={ classes.articleImg }/>
                        <br />
                        📝 Characteristics of an Ideal React Architecture
                    </a>
                    <p className={classes.rambling}>
                        In this write-up, I clarify some misconceptions about React and identify central 
                        characteristics that define a good use of React that large teams could adopt for easy 
                        and lean scalability while cutting down on legacy cruft that is always inevitable. 
                        A lot of this could be equally applicable for other Component-based view libraries on the web.
                        [note: the title is actually not serious, React is not an architecture in itself!]
                    </p>
                </p>
                <hr /><br />
                <iframe 
                    width="292" 
                    height="177" 
                    src="https://www.youtube.com/embed/v1uJjYYvEPw" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen >
                </iframe><br />
                <a href={'https://www.youtube.com/watch?v=v1uJjYYvEPw'}>
                📺 JavaScript Styles in React : The Good Parts
                </a>
                <p className={classes.rambling}>
                    When using React out of the box, we have two styling workflow solutions to choose from: traditional CSS 
                    stylesheets and using inline-styles. This talk breaks down the issues with these approaches and presents a 
                    more React-friendly abstraction for CSS styling known as JSS, and another called ReactJSS designed to take 
                    that even further.
                </p>
                <br />
                <br/><hr /><br />
                <iframe 
                    width="292" 
                    height="177" 
                    src="https://www.youtube.com/embed/4KnJOvw9tLk" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen
                ></iframe><br />
                <p className={classes.rambling}>
                    One of the first pieces of software I ever completed in middleschool -- around 2000; 
                    Not proud of it in any objective sense for quality, but it was actually fun little 72 hour flurry and
                    and became somewhat of a cult classic at the time on the internet :)
                </p>
                <br /><hr /><br />
                <iframe 
                    width="292" 
                    height="100" 
                    scrolling="no" 
                    frameborder="no" 
                    allow="autoplay" 
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/41838495&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
                </iframe><br />
                🎵 ColorShafted: Highwires in Space
                <p className={classes.rambling}>
                    In college, I wrote a game engine and released a few Android apps on a budget. 
                    Naturally you need music to go with a great game, and this became a small
                    hobby of mine during the time :)
                </p>
            </div>
        </div>
    );
};

let VisibleMisc = pure(injectSheet(styleSheet)(connect(
    (state,ownProps)=> ({ language : state.core.language }),
    null
)(Miscellaneous)));

export default VisibleMisc