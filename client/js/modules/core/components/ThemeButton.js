import { useState, useMemo, useCallback, useContext } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DayNightSVGIcon from 'app-root/resources/svg-icons/DayNightSVGIcon';
import { ThemeContext } from 'app-root/ThemeContextProvider';

const themeTargets = {
    'light': 'dark',
    'dark': 'light'
};

const useStyles = makeStyles(() => ({
    container: {
        cursor: 'pointer',
        fontSize: '18pt',
        height: '48px',
        '& svg ': {
            width: '26px',
            height: '26px'
        }
    },
    tooltip: {
        '& > div': {
            display: 'block'
        }
    }
}), { name: 'ThemeButton' });

export default function ThemeButton() {
    const [isToggling, setIsToggling] = useState(false);
    const { setThemeType, themeType } = useContext(ThemeContext);
    const [themeState, setThemeState] = useState(() => themeType );

    const classes = useStyles();

    /**
     * upon clicking, launch sequence to toggle
     * theme and provide some ample time
     * for animation transition to smoothly play out
     */
    const onClick = useCallback( e => {
        if(!isToggling) {
            setIsToggling(true);
            setThemeState(themeTargets[themeType]);
            setTimeout(() => {
                setThemeType(themeTargets[themeState]);
                setIsToggling(false);
            }, 750);
        }
    }, [setThemeType, themeType, isToggling]);

    const [tooltip, description] = useMemo(() => [(
        <div className={ classes.tooltip }>
            <div>Switch to the&nbsp;
                <b>{ themeTargets[themeType] }</b> theme
            </div>
            <div>
                <i>(default is your browser/OS' theme if set)</i>
            </div>
        </div>
    ), (
        `Switch to the ${themeTargets[themeType]
        } theme (default is your native OS' theme if set)`
    )],
    [themeState, themeType, classes.tooltip]);

    return (
        <Tooltip enterDelay={ 400 } title={ tooltip }>
            <Button
                onClick={ onClick }
                className={ classes.container }
                aria-label={ description }
            >   <DayNightSVGIcon selection={ themeState } />
            </Button>
        </Tooltip>
    );
}
