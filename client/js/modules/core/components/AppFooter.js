import React, { useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { Icon } from '@mdi/react';
import {
    mdiGithubBox,
    mdiGmail,
    mdiLinkedinBox
} from '@mdi/js';
import { useAutoFaderClass } from 'utils/hooks';
import { appHistory } from 'utils';
import { rc3NpmBox } from 'utils/icon-paths';

const useStyles = makeStyles(({ palette : { secondary, common, text } }) => ({
    contactButton : {
        display : 'inline-flex',
        justifyContent : 'center',
        flexDirection  : 'column',
        height : '100%',
        '&:hover $icon': {
            fill : secondary.dark
        },
        '&:active $icon': {
            fill : common.active
        }
    },
    '@media (max-width: 400px)': {
        contactButton : { minWidth : '68px' }
    },
    icon : {
        fontSize : '18pt',
        fill : text.secondary,
        lineHeight : '42px',
        minHeight : '42px',
        transition : 'color 0.24s ease, fill 0.48s ease'
    }
}), { name : 'ContactButton' });

export default function AppFooter() {
    const classes = useStyles();
    const fadeContainerClass = useAutoFaderClass();

    const ContactButton = useCallback(({ url, iconPath, tooltipContent }) => {
        ContactButton.displayMode = 'ContactButton';
        const onMouseDown = useCallback( e => appHistory.goTo(url, e), [url]);

        return (
            <Tooltip enterDelay={ 350 } title={ tooltipContent }>
                <Button
                    className={ classes.contactButton }
                    onMouseDown={ onMouseDown }
                ><Icon
                    className={ classes.icon }
                    path={ iconPath }
                    size={ 1 }
                />
                </Button>
            </Tooltip>
        );
    }, [classes]);

    return (
        <div className={ fadeContainerClass }>
            <ContactButton
                iconPath={ mdiGithubBox }
                url={ 'https://github.com/rob2d' }
                tooltipContent={ <>Visit my <b>Github</b></> }
            />
            <ContactButton
                iconPath={ rc3NpmBox }
                url={ 'https://www.npmjs.com/~robftw' }
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
                tooltipContent={ <><b>Email</b> me -- but no spam, please 🙏</> }
            />
        </div>
    );
}
