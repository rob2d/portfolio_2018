import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { setTheme } from 'modules/core/actions'
import Themes from 'constants/Themes'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
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

const styleSheet = {
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
};


class ThemeButton extends PureComponent {

    onClick = event => {
        const { theme, setTheme } = this.props;

        // let the button anim play out a bit
        // (and also prevent user double-taps/clicks
        // in the process)

        if(!this._isToggling) {
            this._isToggling = true;
            setTimeout(()=> {
                setTheme((theme == Themes.LIGHT) ?  Themes.DARK : Themes.LIGHT);
                this._isToggling = false;
            }, 300);
        }
    };

    render () {
        const { 
            classes, 
            theme 
        } = this.props;
        
        return (
            <Tooltip
                enterDelay={ 400 }
                title={ <span>Switch to the <b>{themeTargets[theme].name}</b> theme</span> }
                classes={{ tooltip : classes.tooltip }}
            >
                <Button 
                    onClick={ this.onClick }
                    className={ classes.container } 
                > <DayNightSVGIcon className={ theme } />
                </Button>
            </Tooltip>
        );
    }

}

export default connect(
    ({ core }) => ({ theme : core.theme }), 
    ({ setTheme })
)(injectSheet(styleSheet)(ThemeButton))