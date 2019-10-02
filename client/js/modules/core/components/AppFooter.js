import React, { useCallback } from 'react';
import clsx from 'clsx';
import C from 'color';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import appHistory from 'utils/appHistory';
import withFadeTransitions from 'utils/withFadeTransitions';
import { Icon } from '@mdi/react';
import { 
    mdiGithubBox,
    mdiGmail,
    mdiLinkedinBox
} from '@mdi/js';

const useStyles = makeStyles(({ palette : { primary, secondary, common } }) => ({
    contactButton : {
        display : 'inline-flex',
        justifyContent : 'center',
        flexDirection  : 'column',
        height : '100%',
        '&:hover $icon': {
            color : secondary.dark,
            fill : secondary.dark
        },
        '&:active $icon': {
            color : common.active,
            fill : common.active
        }
    },
    '@media (max-width: 400px)': {
        contactButton : { minWidth : '68px' }
    },
    icon : {
        fontSize : '18pt',
        color : primary.dark,
        fill : primary.dark,
        transition : 'color 0.24s ease-in',
        lineHeight : '42px',
        minHeight : '42px',
        transition : 'color 0.48s ease, fill 0.48s ease'
    }
}), { name : 'ContactButton' });

function AppFooter() {
    const classes = useStyles();

    const ContactButton = useCallback(({ url, iconClass, iconPath, tooltipContent }) => {
        const icon = ( iconClass ? 
            (<i className={ clsx(iconClass, classes.icon) } />) : 
            (<Icon 
                className={ classes.icon } 
                path={ iconPath } 
                size={ 1 }  
            />)
        );

        const onMouseDown = useCallback( e => appHistory.goTo(url, e), [url] );

        return (
            <Tooltip
                enterDelay={ 350 }
                title={ tooltipContent }
                ><Button
                    className={ classes.contactButton }
                    onMouseDown={ onMouseDown }
                >{ icon }
                </Button>
            </Tooltip>
        );
    }, [classes]);

    return (
        <div className="appFooter">
            <ContactButton
                iconPath={ mdiGithubBox }
                url={ 'https://github.com/rob2d' }
                tooltipContent={ <>Visit my <b>Github</b></> }
            />
            <ContactButton
                iconClass={'rc3 rc3-npm-box'}
                url={'https://www.npmjs.com/~robftw'}
                tooltipContent={ <>Browse my <b>NPM</b> repos</> }
            />
            <ContactButton
                iconPath={ mdiLinkedinBox }
                url={ 'https://www.linkedin.com/in/robert-concepci%C3%B3n-iii-66bb7114/' }
                tooltipContent={ <>Connect with me on <b>LinkedIn</b> 🧐</> }
            />
            <ContactButton
                iconPath={ mdiGmail }
                url={ 'mailto:robert.concepcion.iii@gmail.com' }
                tooltipContent={ <>Email me -- but no spam, please (❗)</> }
            />
        </div>
    );
}

export default withFadeTransitions(AppFooter)