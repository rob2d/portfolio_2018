import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setTheme } from 'modules/core/actions'
import Themes from 'constants/Themes'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import DayNightSVGIcon from 'app-root/resources/svg-icons/DayNightSVGIcon'

let themeTargets = {
    [ Themes.LIGHT ] : {
        name      : 'Dark',
        iconClass : 'mdi mdi-weather-night'
    }, 
    [ Themes.DARK ] : {
        name      : 'Light',
        iconClass : 'mdi mdi-weather-sunny'
    }
};

function getFlipTheme (theme) {
    return ((theme == Themes.LIGHT) ?  
                Themes.DARK : Themes.LIGHT
    );
}

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

    const onClick = e => {

        // let the button anim play out a bit smoothly,
        // then begin the theme transition

        if(!isToggling) {
            setIsToggling(true);
            setThemeState(getFlipTheme(theme));
            setTimeout(()=> {
                setTheme(getFlipTheme(theme));
                setIsToggling(false);
            }, 750);
        }
    }

    return (
        <Tooltip
            enterDelay={ 400 }
            title={ <span>Switch to the <b>{themeTargets[themeState].name}</b> theme</span> }
            classes={{ tooltip : classes.tooltip }}
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