import React, { useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { setTheme } from 'modules/core/actions'
import Themes from 'constants/Themes'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import DayNightSVGIcon from 'app-root/resources/svg-icons/DayNightSVGIcon'

let themeTargets = {
    [ 'light' ] : {
        name      : 'Dark',
        iconClass : 'mdi mdi-weather-night'
    }, 
    [ 'dark' ] : {
        name      : 'Light',
        iconClass : 'mdi mdi-weather-sunny'
    }
};

const getFlipTheme = theme => (
    (theme == 'light') ?  'dark' : 'light'
);

const useStyles = makeStyles( theme =>({
    container : {
        cursor : 'pointer',
        color : '#FFFFFF',
        fill : '#FFFFFF',
        stroke : '#FFFFFF'
    },
    tooltip : {
        fontSize   : '11pt !important',
        padding    : '4px 8px !important',
        minHeight  : '20px !important',
        lineHeight : '20px !important'
    },
    icon : {
        fontSize : '16pt'
    }
}), 'ThemeButton');

function ThemeButton ({ theme, setTheme }) {
    const classes = useStyles();
    const [ isToggling, setIsToggling ] = useState(false);
    // reflects theme state
    const [ themeState, setThemeState ] = useState(theme);

    const onClick = useMemo(()=> e => {
        // let the button anim play out a bit smoothly,
        // then begin the theme transition

        if(!isToggling) {
            setIsToggling(true);
            setThemeState(getFlipTheme(theme));
            setTimeout(()=> {
                setTheme(getFlipTheme(themeState));
                console.log('setting is toggling to false');
                setIsToggling(false);
            }, 750);
        }
    }, [setTheme, isToggling]);
    
    const tooltipClasses = useMemo(()=> ({ 
        tooltip : classes.tooltip 
    }), [classes]);

    const tooltipMessage = useMemo(()=> (
        <span>Switch to the <b>{themeTargets[themeState].name}</b> theme</span>
    ), [themeTargets[themeState.name]]);

    return (
        <Tooltip
            enterDelay={ 400 }
            title={ tooltipMessage }
            classes={ tooltipClasses }
        >
            <Button 
                onClick={ onClick }
                className={ classes.container } 
            > <DayNightSVGIcon className={ themeState } />
            </Button>
        </Tooltip>
    );
}

export default connect(
    ({ core }) => ({ theme : core.theme }), 
    ({ setTheme })
)(ThemeButton)