import React from 'react'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import injectSheet from 'react-jss'
import { getTheme } from 'app-root/themeFactory'
import { 
    about as strings, 
    menus as menuStrings 
} from 'strings'
import isPortrait  from 'tools/isPortrait'
import Avatar from '@material-ui/core/Avatar'
import ButtonLink from 'tools/components/ButtonLink'
import SectionLinks from './SectionLinks'
import SkillsOrbit from './SkillsOrbit'

function Tech ({ children, containerClass, url }) {
    return (
        <ButtonLink containerClass={ containerClass } url={ url }>
            { children }
        </ButtonLink>
    );
}

const styleSheet = {
    topContent : {
        width   : ({ viewportWidth })=> (
            (viewportWidth <= 420) ? '100%' : 'auto'
        ),
        display        : 'flex',
        justifyContent : 'center',
        alignItems     : 'center'
    },
    mainContainer : {
        marginLeft     : 'auto',
        marginRight    : 'auto',
        maxWidth       : '700px',
        flexGrow       : 1,
        display        : 'flex',
        flexDirection  : 'column',
        justifyContent : 'center',
        padding        : ({ viewportWidth, viewportHeight }) => (
            isPortrait(viewportWidth, viewportHeight) ? '0px 16px' : '16px'
        ),
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
        color         : ({ theme }) => (
            getTheme(theme).rc3.text
        )
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
        centerContent : {
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
        }
    },
    
    tooltip : {
        fontSize : '11pt !important',
        padding  : '4px 8px !important',
        minHeight: '20px !important',
        lineHeight: '20px !important'
    },

    tech : {
        display       : 'inline-block',
        fontFamily    : 'roboto_regular',
        color         : ({ theme })=> getTheme(theme).rc3.text,
        verticalAlign : 'top !important',
        fontSize      : '12pt',
        
        '@media (min-width:901px)' : {
            fontSize : '14pt !important'
        },

        // for general mobile devices in landscape
        '@media (orientation:landscape) and (max-width:900px)' : {
            fontSize : '11pt'
        }
    }

};

function About ({ classes, viewportWidth, viewportHeight, theme }) {
    let { period, comma } = strings;

    // check renderpixels on viewport for (general)
    // coverage of landscape; covers iPhone6-X
    // and most android devices
    const coreProps = { viewportWidth, viewportHeight, theme };
    const techProps = { containerClass : classes.tech, theme };
    const isInPortrait = isPortrait(viewportWidth, viewportHeight);

    return (
        <div className={classes.mainContainer}>
            <div className={classes.topContent}>
                <Avatar 
                    alt={'Rob'} 
                    src="img/about/me.jpg" 
                    className={classes.avatar}
                />
                { isInPortrait && <SectionLinks {...coreProps} /> }
            </div>

            <div className={classes.centerContent}>
                <p className={classes.pText}> 
                    {strings.thisSiteWas}
                    <Tech url={'https://reactjs.com'} { ...techProps }>React</Tech>,&nbsp;
                    <Tech url={'https://redux.js.org'} { ...techProps }>Redux</Tech>,&nbsp;
                    <Tech url={'https://threejs.org'} { ...techProps }>THREE.js</Tech>,&nbsp; 
                    <Tech url={'https://nodejs.org'} { ...techProps }>Node</Tech>,&nbsp; 
                    <Tech url={'https://gulpjs.com'} { ...techProps }>Gulp</Tech>,&nbsp;
                    {strings.andDeployedUsing}
                    <Tech url={'http://nginx.org'} { ...techProps }>NginX</Tech> and&nbsp; 
                    <Tech url={'http://pm2.keymetrics.io/'} { ...techProps }>PM2</Tech>.
                </p>
                { !isInPortrait && <SectionLinks {...coreProps} /> }
            </div>

            <div className={classes.skillsOrbit}>
                <SkillsOrbit />
            </div>
        </div>
    );
};

export default pure(connect(
    ({ core }, ownProps)=> ({ 
        theme          : core.theme,
        viewportWidth  : core.viewportWidth,
        viewportHeight : core.viewportHeight
     })
)(injectSheet(styleSheet)(About)));