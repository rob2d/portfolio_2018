import React, { memo } from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { connect } from 'react-redux'
import appHistory from 'utils/appHistory'
import withFadeTransitions from 'utils/withFadeTransitions'

const useStyles = makeStyles(theme => ({
    contactButton : {
        display        : 'inline-flex',
        justifyContent : 'center',
        flexDirection  : 'column',
        '&:hover $icon': {
            color : `${theme.palette.primary[800]} !important`
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
        color : theme.rc3.footerIcon,
        transition : 'color 0.24s ease-in'
    },
    tooltip : {
        fontSize : '11pt',
        padding : '4px 8px',
        minHeight : '20px',
        lineHeight : '20px'
    }
}), 'ContactButton');

const ContactButton = memo(function ContactButton({ 
    url, 
    iconClass, 
    tooltipContent 
}){ 
    const classes = useStyles({ url, iconClass, tooltipContent });
    
    return (
        <Tooltip
            enterDelay={ 350 }
            title={ tooltipContent }
            classes={{ tooltip : classes.tooltip }}
        >
            <Button
                className={ classes.contactButton }
                onMouseDown={ e => appHistory.goTo(url, e) }
            ><i className={`${iconClass} ${classes.icon}`}/>
            </Button>
        </Tooltip>
    );
});

const AppFooter = withFadeTransitions(function AppFooter() {
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