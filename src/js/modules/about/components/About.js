import React from 'react'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import injectSheet from 'react-jss'
import { getTheme }        from 'app-root/themeFactory'
import { 
    about as strings, 
    menus as menuStrings 
} from 'strings'
import Avatar from '@material-ui/core/Avatar'
import ButtonLink from 'tools/components/ButtonLink'
import SectionLink from './SectionLink'
import SkillsOrbit from './SkillsOrbit'
import isLandscape from 'tools/isLandscape'

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
        fontSize      : '12pt',
        fontFamily    : 'roboto_light',
        color         : ({ theme }) => {
            return getTheme(theme).rc3.text; 
        }
    },
    sectionList : {
        paddingLeft   : '16px',
        paddingRight  : '16px',
        paddingTop    : '8px',
        paddingBottom : '0px',
        textAlign     : 'left',
        paddingInlineStart : ({ viewportWidth, viewportHeight }) => (
            !isLandscape(viewportWidth, viewportHeight) ? 
                '40px' : '16px'
        )
    },
    sectionLink : {
        display : ({ viewportWidth, viewportHeight }) => (
            !isLandscape(viewportWidth, viewportHeight) ? 
                'block' : 'inline-block'
        ),
        padding : '8px !important',
        '&:hover $listItem' : {
            color : '#ff4081'
        },
        '&:active $listItem' : {
            color : '#00b8d4'
        }
    },
    linkDivider : {
        display : 'inline-block'
    },
    avatar : {
        width  : '128px',
        height : '128px',
        margin : '32px auto'
    },
    skillsOrbit : {
        position : 'relative'
    },
    '@media (max-width: 700px) and (min-width : 341px) and (orientation:portrait)': {
        // don't want the avatar to dominate the 
        // mobile screen :
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
            padding       : '16px',
            flexDirection : 'row !important',
            boxSizing     : 'border-box'
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
        aboutMe : {
            display       : 'flex',
            flexDirection : 'column', 
            overflowY     : 'auto',
            zIndex        : 5000,
            flexGrow : 1
        },
        skillsOrbit : {
            display       : 'flex',
            flexDirection : 'column',
            overflowY     : 'auto',
            flexGrow      : 1
        },
        sectionList : {
            paddingLeft : '64px'
        }
    },
    tooltip : {
        fontSize : '11pt !important',
        padding  : '4px 8px !important',
        minHeight: '20px !important',
        lineHeight: '20px !important'
    }
};


let Tech = injectSheet({
    container : {
        display       : 'inline-block',
        fontFamily    : 'roboto_regular',
        color         : ({ theme })=> getTheme(theme).rc3.text,
        verticalAlign : 'top !important',
        fontSize      : '12pt'
    },
    '@media (min-width:901px)' : {
        container : {
            fontSize : '14pt !important'
        }
    },
     // for general mobile devices in landscape
     '@media (orientation:landscape) and (max-width:900px)' : {
         container : {
            fontSize : '11pt'
         }
     }
})(function Tech ({ children, classes, url, theme }) {
    return (
        <ButtonLink containerClass={ classes.container } url={ url }>
            { children }
        </ButtonLink>
    );
});

function About ({ classes, viewportWidth, viewportHeight, theme }) {
    let { period, comma } = strings;

    // check renderpixels on viewport for (general)
    // coverage of landscape; covers iPhone6-X
    // and most android devices
    const isLandscapeView = isLandscape(viewportWidth, viewportHeight);
    const linkDividerClass = `mdi mdi-circle-small ${classes.linkDivider}`;
    const coreProps = { viewportWidth, viewportHeight, theme };

    return (
        <div className={classes.mainContainer}>
            
            <Avatar 
                alt={'Rob'} 
                src="img/about/me.jpg" 
                className={classes.avatar}
            />

            <div className={classes.aboutMe}>
                <p className={classes.pText}>
                    {strings.hiAndThanks}
                </p> 
                <p className={classes.pText}> 
                    {strings.thisSiteWas}
                    <Tech url={'https://reactjs.com'} theme={theme}>React</Tech>,&nbsp;
                    <Tech url={'https://redux.js.org'} theme={theme}>Redux</Tech>,&nbsp;
                    <Tech url={'https://threejs.org'} theme={theme}>THREE.js</Tech>,&nbsp; 
                    <Tech url={'https://nodejs.org'} theme={theme}>Node</Tech>,&nbsp; 
                    <Tech url={'https://gulpjs.com'} theme={theme}>Gulp</Tech>,&nbsp;
                    {strings.andDeployedUsing}
                    <Tech url={'http://nginx.org'} theme={theme}>NginX</Tech> and&nbsp; 
                    <Tech url={'http://pm2.keymetrics.io/'} theme={theme}>PM2</Tech>.
                </p>
                <ul className={classes.sectionList}>
                    <SectionLink 
                        name={menuStrings.main.projects} 
                        mdiClass={'briefcase'} 
                        url={'/projects'} 
                        containerClass={classes.sectionLink}
                        { ...coreProps }
                    />
                    { isLandscapeView  && <i className={linkDividerClass} /> }
                    <SectionLink 
                        name={ isLandscapeView ? 'Misc' : 'Miscellaneous' } 
                        mdiClass={'dice-multiple'} 
                        url={'/misc'} 
                        containerClass={classes.sectionLink}
                        { ...coreProps }
                    /> 

                    { isLandscapeView  && <i className={linkDividerClass} /> }
                    <SectionLink
                        name={menuStrings.main.cv}
                        mdiClass={'file-document-box'}
                        url={'/cv'}
                        containerClass={classes.sectionLink}
                        { ...coreProps }
                    />
                </ul>
            </div>

            <div className={classes.skillsOrbit}>
                <SkillsOrbit />
            </div>
        </div>
    );
};

export default pure(connect(
    ({ core }, ownProps)=> ({ 
        theme : core.theme,
        viewportWidth : core.viewportWidth,
        viewportHeight : core.viewportHeight
     })
)(injectSheet(styleSheet)(About)));