import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import injectSheet from 'react-jss'
import { withStyles } from '@material-ui/core/styles'
import { about as strings } from 'strings'
import appHistory from 'tools/appHistory'
import Avatar from '@material-ui/core/Avatar'
import SkillsOrbit from './SkillsOrbit'

const linkSheet = {
    listItem : {
        listStyleType : 'none',
        cursor        : 'pointer',
        lineHeight    : '30px',
        color         : '#c51162',
        fontFamily    : 'roboto_bold'
    },
    icon : {
        marginRight : '16px',
        color       : '#000000'
    }
};

let SectionLink = injectSheet(linkSheet)(
    function SectionLinkLayout ({ url, name, mdiClass, classes }) {
    return (
        <Fragment>
            <li 
                className={classes.listItem} 
                onClick={ ()=> appHistory.goTo(url) }
            ><i 
                className={`mdi mdi-${mdiClass} ${classes.icon}`}
            />&nbsp;{name}
            </li>
        </Fragment>
    );
});

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
        paddingLeft   : '16px',
        paddingRight  : '16px',
        paddingTop    : '0px',
        paddingBottom : '0px',
        textAlign     : 'left',
        fontFamily    : 'roboto_light'
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
            maxWidth : '1100px !important'
        },
        pText : {
            paddingLeft  : '32px !important',
            paddingRight : '32px !important',
            fontSize     : '14pt !important',
            fontFamily   : 'roboto_light !important'
        },
        wipNote : {
            fontSize : '12pt !important'
        },
        aboutMe : {
            display       : 'flex',
            flexDirection : 'column', 
            overflowY     : 'auto',
            zIndex        : 5000,
            flexGrow : 1
        },
        skillsOrbit : {
            display   : 'flex',
            direction : 'column',
            overflowY : 'auto',
            flexGrow  : 1
        }
    }
};

function About ({ classes }) {
    return (
        <div className={classes.mainContainer}>
            
            <Avatar 
                alt={'Rob'} 
                src="img/about/robtalk.jpg" 
                className={classes.avatar}
            />

            <div className={classes.aboutMe}>
                <p className={classes.pText}> 
                    This website was created from the ground up using &nbsp;<b>React</b>,
                    &nbsp; <b>Redux</b>, <b>THREE.js</b>, <b>Node</b>, <b>Gulp</b>&nbsp;
                    and deployed using <b>NginX</b>. Not the most ideal -- "someday"
                    I will have time to refine (and as the saying goes: "the road to 
                    someday leads to a town called nowhere"! <i>/endbadjoke</i>). 
                </p>
                <p className={classes.pText}>
                    In the meantime, feel free to explore the other sections: 
                    <ul>
                    <SectionLink 
                        name={'Projects'} 
                        mdiClass='briefcase' 
                        url={'/projects'} 
                    />
                    <SectionLink 
                        name={'Miscellaneous'} 
                        mdiClass='dice-multiple' 
                        url={'/projects'} 
                    /> 
                    <SectionLink
                        name={'CV'}
                        mdiClass={'file-document-box'}
                        url={'/cv'}
                    />
                </ul>
                </p>
            </div>

            <div className={classes.skillOrbit}>
                <SkillsOrbit />        
            </div>
        </div>
    );
};

let VisibleAbout = pure(injectSheet(styleSheet)(connect(
    (state,ownProps)=> ({ language : state.core.language }),
    null
)(About)));
export default VisibleAbout;