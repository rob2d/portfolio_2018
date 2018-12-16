import React from 'react'
import injectSheet from 'react-jss'
import Button from '@material-ui/core/Button'
import pure from 'recompose/pure'
import Themes from 'constants/Themes'
import Tooltip from '@material-ui/core/Tooltip'
import { connect } from 'react-redux'
import { getTheme } from 'app-root/themeFactory'
import appHistory from 'utils/appHistory'

const styles = {
    contactButton : {
        display        : 'inline-flex',
        justifyContent : 'center',
        flexDirection  : 'column',
        '&:hover $icon': {
            color : ({ theme }) =>`${getTheme(theme).palette.primary[800]} !important`
        },
        '&:active $icon': {
            color : '#00b8d4'
        }
    },
    '@media (max-width: 400px)': {
        contactButton : { minWidth : '68px' }
    },
    icon : {
        fontSize : '18pt',
        color    : ({ theme }) => ((theme == Themes.LIGHT) ? 
            '#455A64' : getTheme(theme).palette.primary[700]),
        transition : 'color 0.24s ease-in'
    },
    tooltip : {
        fontSize : '11pt',
        padding  : '4px 8px',
        minHeight: '20px',
        lineHeight: '20px'
    }
};

const ContactButton = pure(injectSheet(styles)
(function ContactButton({ 
    url, 
    classes, 
    iconClass, 
    tooltipContent 
}){ 
    return (
        <Tooltip
            enterDelay={350}
            title={tooltipContent}
            classes={{ tooltip : classes.tooltip }}
        >
            <Button
                className={ classes.contactButton }
                onMouseDown={()=>{ appHistory.goTo(url) }}
            ><i className={`${iconClass} ${classes.icon}`}/>
            </Button>
        </Tooltip>
    )}
));
ContactButton.displayName = 'ContactButton';

const AppFooter = connect(
    ({ core }) => ({ theme : core.theme })
)(function AppFooter() {
    return (
        <div className="appFooter">
        
            <ContactButton
                iconClass={ 'mdi mdi-github-box' }
                url={ 'https://github.com/rob2d' }
                tooltipContent={ <span>Visit my <b>Github</b></span> }
            />
            <ContactButton
                iconClass={'rc3 rc3-npm-box'}
                url={'https://www.npmjs.com/~robftw'}
                tooltipContent={ <span>Browse my <b>NPM</b> repos</span> }
            />
            <ContactButton
                iconClass={'mdi mdi-linkedin-box'}
                url={'https://www.linkedin.com/in/robert-concepci%C3%B3n-iii-66bb7114/'}
                tooltipContent={ <span>Connect with me on <b>LinkedIn</b> 🧐</span> }
            />
            <ContactButton
                iconClass={ 'mdi mdi-gmail' }
                url={ 'mailto:robert.concepcion.iii@gmail.com' }
                tooltipContent={ <span>Email me -- but no spam, please (❗)</span> }
            />
            
        </div>
    )
});

export default AppFooter