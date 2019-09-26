import React, { 
    useState, useMemo, useCallback
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from 'modules/core/actions';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import DayNightSVGIcon from 'app-root/resources/svg-icons/DayNightSVGIcon';

let themeTargets = {
    ['light'] : {
        name      : 'Dark',
        iconClass : 'mdi mdi-weather-night'
    }, 
    ['dark'] : {
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
        fontSize : '16pt',
        '&,& *': {
            color : '#FFF',
            fill : '#FFF',
            stroke : '#FFF'
        }
    }
}), 'ThemeButton');

export default function ThemeButton () {
    const dispatch = useDispatch();
    const theme = useSelector( state => state.core.theme );
    const [ isToggling, setIsToggling ] = useState(false);
    const [ themeState, setThemeState ] = useState(theme);

    const classes = useStyles();

    /**
     * upon clicking, launch sequence to toggle
     * theme and provide some ample time
     * for animation transition to smoothly play out
     */
    const onClick = useCallback( e => {
        if(!isToggling) {
            setIsToggling(true);
            setThemeState(getFlipTheme(theme));
            setTimeout(()=> {
                dispatch(setTheme(getFlipTheme(themeState)));
                setIsToggling(false);
            }, 750);
        }

    }, [setTheme, isToggling]);

    const tooltip = useMemo(()=> (
        <span>Switch to the&nbsp;
            <b>{themeTargets[themeState].name}</b> theme
        </span>
    ), [themeState]);

    return (
        <Tooltip enterDelay={ 400 } title={ tooltip } >
            <Button onClick={ onClick } className={ classes.container } > 
                <DayNightSVGIcon className={ themeState } />
            </Button>
        </Tooltip>
    );
}