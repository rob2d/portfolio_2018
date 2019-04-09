import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import appHistory from 'utils/appHistory'
import withFadeTransitions from 'utils/withFadeTransitions'

const useStyles = makeStyles(({ palette, rc3 }) => ({
    contactButton : {
        display : 'inline-flex',
        justifyContent : 'center',
        flexDirection  : 'column',
        '&:hover $icon': {
            color : palette.primary[900]
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
        color : rc3.footerIcon,
        transition : 'color 0.24s ease-in'
    }
}), { name : 'ContactButton' });

function ContactButton({ url, iconClass, tooltipContent }){ 
    const classes = useStyles({ url, iconClass, tooltipContent });
    const onMouseDown = useMemo(()=> e => appHistory.goTo(url, e), [url]);
    return (
        <Tooltip
            enterDelay={ 350 }
            title={ tooltipContent }
        >
            <Button
                className={ classes.contactButton }
                onMouseDown={ onMouseDown }
            ><i className={`${iconClass} ${classes.icon}`}/>
            </Button>
        </Tooltip>
    );
}

function AppFooter() {
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
}

export default withFadeTransitions(AppFooter)