import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import pure from 'recompose/pure'
import Themes from 'constants/Themes'
import Tooltip   from '@material-ui/core/Tooltip'

const styles = theme=> ({
    contactButton : {
        display        : 'inline-flex !important',
        justifyContent : 'center !important',
        flexDirection  : 'column !important',
    },
    '@media (max-width: 400px)': {
        contactButton : { minWidth : '68px !important' }
    },
    icon : {
        fontSize : '18pt !important',
        color    : ((theme == Themes.LIGHT) ? 
                        '#455A64' : 
                        theme.palette.primary[700])+ ' !important'
    },
    tooltip : {
        fontSize : '11pt !important',
        padding  : '4px 8px !important',
        minHeight: '20px !important',
        lineHeight: '20px !important'
    },
});

const ContactButton = pure(withStyles(styles)
(function ContactButton({ url, classes, iconClass, tooltipContent }){ return (
    <Tooltip
    enterDelay={350}
    title={tooltipContent}
    classes={{ tooltip : classes.tooltip }}
    >
        <Button
            className={ classes.contactButton }
            onClick={()=>{ location.href = url }}
        ><i className={`${iconClass} ${classes.icon}`}/>
        </Button>
    </Tooltip>
)}));
ContactButton.displayName = 'ContactButton';


const AppFooter = pure(function AppFooter() {
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
                url={'https://www.linkedin.com/in/' +
                'robert-concepci%C3%B3n-iii-66bb7114/'}
                tooltipContent={ <span>Connect with me on <b>LinkedIn</b> 🧐</span> }
            />
            <ContactButton
                iconClass={'mdi mdi-gmail'}
                url={'mailto:robert.concepcion.iii@gmail.com'}
                tooltipContent={ <span>Email me -- but no spam, please (❗)</span> }
            />
        </div>
    )
});

export default AppFooter