import { createMuiTheme } from '@material-ui/core/styles'
import indigo from '@material-ui/core/colors/indigo'
import red from '@material-ui/core/colors/red'
import pink from '@material-ui/core/colors/pink'
import grey from '@material-ui/core/colors/grey'
import Themes from 'constants/Themes'

let themes = {};


/**
 * grabs a theme; otherwise creates and caches a theme
 * corresponding to the theme entered
 */
export const getTheme = theme => {
    if(!themes[theme]) {
        themes[theme] = createMuiTheme({
            // MUI goes a bit far with defaults;
            // this is a simpler alternative
            // until there is a need for more
            // complex theming
            theme : theme, // allows lookup of theme value
            rc3 : {
                text : (theme == Themes.LIGHT) ? 
                            '#000000' : '#FFFFFF',
                contrastText : (theme == Themes.LIGHT) ? 
                            '#FFFFFF' : grey['A100'],
                secondaryContrastText : '#FFFFFF',
                background : (theme == Themes.LIGHT) ? 
                            '#FFFFFF' : '#000000'
            },
            palette: {
                primary   : grey, 
                secondary : pink,
                error     :  red,
                text      : (theme == Themes.LIGHT) ? 
                            '#000000' : 
                            '#FFFFFF',
               
            },
            overrides : {
                MuiTooltip : {
                    tooltip : {
                        backgroundColor : (theme == Themes.LIGHT) ? '#616161' : pink[900]
                    }
                },
                MuiTypography : {
                    body1 : {
                        fontFamily : 'roboto_light',
                        fontSize   : '0.95rem'
                    },
                    root : {
                        color : (theme == Themes.LIGHT) ? 
                                    '#000000' : '#FFFFFF'
                    }
                },
                MuiToolbar : {
                    root : {

                    }
                },
                MuiButton : {
                    disabled : {
                        color : (theme == Themes.LIGHT) ? 
                                    'rgba(0, 0, 0, 0.26)' :
                                    'rgba(255, 255, 255, 0.26) !important'
                    }
                },
                MuiAppBar : {
                    colorPrimary : {
                        color : '#FFFFFF',
                        backgroundColor : theme == Themes.LIGHT ? '#000000' : grey[800],
                        position        : 'relative',
                        minHeight       : '56px', // needed to prevent gutters 
                                                  // from resizing
                        transition      : '0.5s all'
                    },
                    positionFixed : {
                        
                        // started off with previous version,
                        // so this keeps things playing nicely

                        position : 'relative'
                    }
                },
                MuiCircularProgress : {
                    root : {
                        color : pink[400]
                    },
                    colorPrimary : {
                        color : (theme == Themes.LIGHT) ? 
                                    '#000000' : '#FFFFFF'
                    }
                },
                MuiPaper : {
                    root : {
                        backgroundColor : (theme == Themes.LIGHT) ? 
                                '#FFFFFF' : 
                                '#000000'
                    },
                    elevation1 : {
                        
                        // just needed to get around
                        // issue with card anims

                        boxShadow : 'none'
                    },
                    elevation4 : {
                        boxShadow : (()=> {
                            let rgbColor = ((theme == Themes.LIGHT) ? 
                                '0, 0, 0' : '120, 120, 120'
                            );

                            let strength = ((theme == Themes.LIGHT) ? 1 : 1);
                        
                            return `0px 2px 4px -1px rgba(${rgbColor}, ${0.2*strength}), ` + 
                                   `0px 4px 5px 0px rgba(${rgbColor}, ${0.14*strength}), ` + 
                                   `0px 1px 10px 0px rgba(${rgbColor}, ${0.12*strength})`;
                        })()
                    }
                }
            }
        });
    }

    return themes[theme];
};

export default { themes, getTheme };
export { themes };