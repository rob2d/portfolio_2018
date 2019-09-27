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
    'light' : {
        name : 'Dark',
    }, 
    'dark' : {
        name : 'Light',
    }
};

const getFlipTheme = theme => (
    (theme == 'light') ?  'dark' : 'light'
);

const useStyles = makeStyles( theme => ({
    container : {
        cursor : 'pointer',
        fontSize : '18pt',
        height : '48px',
        '& svg ' : {
            width : '28px',
            height : '28px'
        },
        '&,& *': {
            color : '#FFF',
            fill : '#FFF',
            stroke : '#FFF'
        }
    },
    '@global' : {
        ['.themeicon__star'] : {
            transformOrigin : '50% 50%',
            stroke : 'rgba(0,0,0,0)',
            strokeWidth : '2px'
        },
    
        ['.themeicon__moon'] : {
            stroke : 'rgba(255,255,255,1)',
            fill : 'none'
        },
    
        ['.light .themeicon__star'] : { 
            transition : 'transform 0.35s ease-in 0.125s',
            stroke : 'rgba(0,0,0,0)'
        },
    
    
        ['.dark .themeicon__star'] : { 
            transition: 'transform 0.35s ease-in 0s',
            stroke: 'rgba(0,0,0,0)'
        },
    
        ['.light > .themeicon__moon'] : {
            opacity : 0,
            transformOrigin : '50% 52%',
            transform : 'scale(0.475)',
            transition : 'opacity 0.5s ease 0.25s, transform 0.25s linear 0s',
            stroke : 'rgba(255,255,255,1)',
            fill : 'none'
        },
    
        ['.dark > .themeicon__moon'] : {
            opacity : 1,
            transformOrigin : '50% 52%',
            transition : 'opacity 0.5s ease, transform 0.25s linear 0.20s',
            stroke : 'rgba(255,255,255,1)',
            fill : 'none'
        },
    
        ['.dark > .themeicon__sun'] : {
            opacity : '0',
            transition : 'opacity 0.75s ease 0.1s',
            stroke : 'rgba(255,255,255,1)',
            fill : 'none'
        },
    
        ['.light > .themeicon__sun'] : {
            opacity : 1,
            transition : 'opacity 0.75s ease 0.25s',
            stroke : 'rgba(255,255,255,1)',
            fill : 'none'
        },
    
        ['.light > .themeicon__stara1'] : {
            transform : 'scaleX(0.5) scaleY(0.6) translateX(29%) ' + 
                        'translateY(-50%) rotateZ(-108deg)'
        },
    
        ['.light > .themeicon__stara2'] : {
            transform : 'scaleX(0.5) scaleY(0.6) translateX(-75%) ' + 
                        'translateY(-25%) rotateZ(-290deg)'
        },
    
        ['.light > .themeicon__stara3'] : {
            transform : 'scaleX(0.5) scaleY(0.6) translateX(-75%) ' + 
                        'translateY(40%) rotateZ(50deg)'
        },
    
        ['.light > .themeicon__starb1'] : {
            transform : 'scaleX(0.7) scaleY(0.8) ' + 
                        'translateX(25%) translateY(3%) rotateZ(-65deg)'
        },
    
        ['.light > .themeicon__starb2'] : {
            transform : 'scaleX(0.7) scaleY(0.8) ' + 
                        'translateX(30%) translateY(40%) rotateZ(-60deg)'
        },
    
        ['.light > .themeicon__starb3'] : {
            transform : 'scaleX(0.7) scaleY(0.8) translateX(-5%) ' + 
                        'translateY(66%) rotateZ(-73.5deg)'
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