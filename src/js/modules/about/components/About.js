import React, { Component } from 'react'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import injectSheet from 'react-jss'
import { withStyles } from '@material-ui/core/styles'
import { about as strings } from 'strings'
import Avatar from '@material-ui/core/Avatar'
import ThreeBG from './ThreeBG'

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
        textAlign    : 'left',
        fontFamily   : 'roboto_regular'
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
            margin : '16px 16px 8px !important',
            marginLeft  : '16px',
            marginRight : '16px'
        },
        mainContainer : {
            flexDirection : 'row !important',
            boxSizing : 'border-box'
        }
    },
    // for general mobile devices in landscape
    '@media (orientation:landscape) and (max-width:900px)': {
        avatar : {
            width : '80px !important',
            height: '80px !important',
        },
        pText : {
            fontSize : '11pt'
        }
    },
    // again, for iPhone 5
    '@media (orientation:landscape) and (max-height:320px)': {
        pText : {
            marginTop : '8px',
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
        pText : {
            paddingLeft  : '32px !important',
            paddingRight : '32px !important',
            fontSize     : '14pt !important',
            fontFamily   : 'roboto_regular !important'
        },
        wipNote : {
            fontSize : '12pt !important'
        },
        aboutMe : {
            display       : 'flex',
            flexDirection : 'column', 
            overflowY     : 'auto',
            zIndex        : 5000
        }
    }
};

function About ({ classes }) {
    return (
        <div className={classes.mainContainer}>
            <ThreeBG />
            <Avatar alt={'Rob'} src="img/about/robtalk.jpg" className={classes.avatar}/>
            <div className={classes.aboutMe}>
                <p className={classes.pText}>
                    Hi and thank you for visiting my page 🙂 Here is where I try to collect a 
                    few projects I have worked on (that are possible to show outside of work), and 
                    other random things. This website was created by myself using React, Redux, 
                    THREE.js, Node, Gulp and deployed using NginX. Not the most ideal thing I've 
                    created -- "someday" I will have time to refine (and like they say: 
                    "the road to someday leads to a town called nowhere"! <i>/endbadjoke</i>).
                </p>
                <p className={classes.pText}>
                    Anyway, a bit about me: I have been developing software as a hobby since I was 11 
                    years old, and for the last few years after a brief stint in the military 
                    and graduate school, I have been working professionally as a full-stack engineer. 
                    Through this I have worked in a variety of capacities: from front-end to backend, to 
                    database design, scaleable and widely used RESTful APIs, cohesive serverless 
                    architectures, dev-ops and even UI/UX design. Throughout my experiences 
                    thus far, I have been very fortunate to work with and learn from amazingly 
                    smart people, and I am sure that this is a large reason why I have witnessed 
                    exponential growth at every company in terms of product capabilities and 
                    quality as well as my own skills and mindset. I enjoy learning, love what I do 
                    and I don't plan to stop or slow down any time soon!
                </p>
            </div>
        </div>
    );
};

let VisibleAbout = pure(injectSheet(styleSheet)(connect(
    (state,ownProps)=> ({ language : state.core.language }),
    null
)(About)));
export default VisibleAbout;