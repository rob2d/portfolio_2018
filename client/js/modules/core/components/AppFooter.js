import { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { Icon } from '@mdi/react';
import { mdiGithubBox, mdiGmail, mdiLinkedinBox } from '@mdi/js';
import { useAutoFaderClass, useNavigateTo } from 'utils/hooks';
import { rc3NpmBox } from 'utils/icon-paths';

const useStyles = makeStyles(({ palette: { secondary, common, text } }) => ({
    contactButton: {
        display: 'inline-flex',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        '&:hover $icon': {
            fill: secondary.dark
        },
        '&:active $icon': {
            fill: common.active
        },
        '& .MuiButton-text': {
            padding: '0px 0px'
        }
    },
    '@media (max-width: 400px)': {
        contactButton: { minWidth: '68px' }
    },
    icon: {
        fontSize: '18pt',
        fill: text.secondary,
        lineHeight: '42px',
        minHeight: '42px',
        transition: 'color 0.24s ease, fill 0.48s ease'
    }
}), { name: 'ContactButton' });

export default function AppFooter() {
    const navigateTo = useNavigateTo();
    const classes = useStyles();
    const fadeContainerClass = useAutoFaderClass();

    const ContactButton = useCallback(({ url, iconPath, tooltipContent, description }) => {
        const onMouseDown = useCallback(e => navigateTo(url, e), [url]);
        ContactButton.displayMode = 'ContactButton';

        return (
            <Tooltip enterDelay={ 350 } title={ tooltipContent }>
                <Button
                    className={ classes.contactButton }
                    onMouseDown={ onMouseDown }
                    aria-label={ description }
                ><Icon className={ classes.icon } path={ iconPath } size={ 1 } />
                </Button>
            </Tooltip>
        );
    }, [classes]);

    return (
        <div className={ fadeContainerClass } data-id={ 'app-footer' }>
            <ContactButton
                iconPath={ mdiGithubBox }
                url={ 'https://github.com/rob2d' }
                tooltipContent={ <>Visit my <b>Github</b></> }
                description={ 'Visit Github Account' }
            />
            <ContactButton
                iconPath={ rc3NpmBox }
                url={ 'https://www.npmjs.com/~robftw' }
                tooltipContent={ <>Browse my <b>NPM</b> repos</> }
                description={ 'Visit NPM Repos' }
            />
            <ContactButton
                iconPath={ mdiLinkedinBox }
                url={
                    'https://www.linkedin.com/in/robert-concepci%C3%B3n-iii-66bb7114/'
                }
                tooltipContent={ <>Connect with me on <b>LinkedIn</b> 🧐</> }
                description={ 'Visit LinkedIn Account' }
            />
            <ContactButton
                iconPath={ mdiGmail }
                url={ 'mailto:robert.concepcion.iii@gmail.com' }
                tooltipContent={ <><b>Email</b> me -- but no spam, please 🙏</> }
                description={ 'Write an Email' }
            />
        </div>
    );
}
