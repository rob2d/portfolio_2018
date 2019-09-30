import React, { useCallback } from 'react';
import clsx from 'clsx';
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

const useStyles = makeStyles(({ palette, rc3 }) => ({
    contactButton : {
        display : 'inline-flex',
        justifyContent : 'center',
        flexDirection  : 'column',
        height : '100%',
        '&:hover $icon': {
            color : palette.primary[900],
            fill : palette.primary[900]
        },
        '&:active $icon': {
            color : '#00b8d4',
            fill : '#00b8d4'
        }
    },
    '@media (max-width: 400px)': {
        contactButton : { minWidth : '68px' }
    },
    icon : {
        fontSize : '18pt',
        color : rc3.footerIcon,
        fill : rc3.footerIcon,
        transition : 'color 0.24s ease-in',
        lineHeight : '42px',
        minHeight : '42px'
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