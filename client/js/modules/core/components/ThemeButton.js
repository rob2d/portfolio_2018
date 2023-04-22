import { useState, useMemo, useCallback, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import DayNightSVGIcon from 'app-root/resources/svg-icons/DayNightSVGIcon';
import { ThemeContext } from 'app-root/ThemeContextProvider';

const PREFIX = 'ThemeButton';

const classes = {
    container: `${PREFIX}-container`,
    tooltip: `${PREFIX}-tooltip`
};

const StyledTooltip = styled(Tooltip)(() => ({
    [`& .${classes.container}`]: {
        cursor: 'pointer',
        fontSize: '18pt',
        height: '48px',
        '& svg ': {
            width: '26px',
            height: '26px'
        }
    },

    [`& .${classes.tooltip}`]: {
        '& > div': {
            display: 'block'
        }
    }
}));

const themeTargets = {
    'light': 'dark',
    'dark': 'light'
};

export default function ThemeButton() {
    const [isToggling, setIsToggling] = useState(false);
    const { setThemeType, themeType } = useContext(ThemeContext);
    const [themeState, setThemeState] = useState(() => themeType );



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
        <StyledTooltip enterDelay={ 400 } title={ tooltip }>
            <Button
                onClick={ onClick }
                className={ classes.container }
                aria-label={ description }
            >   <DayNightSVGIcon selection={ themeState } />
            </Button>
        </StyledTooltip>
    );
}
