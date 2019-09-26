import { createMuiTheme } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import pink from '@material-ui/core/colors/pink'
import grey from '@material-ui/core/colors/grey'
import Themes from 'constants/Themes'

let themes = {};

// TODO : organize the palette to use a mutual system;
// also rely a bit more on built in Mui components
// now that 4.x.x+ can be used

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
            theme,
            rc3 : {
                text : (theme=='light') ? '#000' : '#FFF',
                contrastText : (theme=='light') ? '#FFF' : grey['A100'],
                secondaryContrastText : '#FFF',
                background : (theme=='light') ? '#FFF' : '#000',
                footerIcon : (theme=='light') ? '#455A64' : grey[700]
            },
            palette: {
                primary   : {
                    light : grey[700],
                    main : grey['A100'],
                    dark : grey[500]
                }, 
                secondary : pink,
                error :  red,
                text : { 
                    primary : (theme=='light') ? '#000' : '#FFF'
                },
                type : theme
            },
            overrides : {
                MuiTooltip : {
                    tooltip : {
                        backgroundColor : (theme=='light') ? '#616161' : pink[900]
                    },
                    popper : {
                        fontSize : '11pt',
                        padding  : '4px 8px',
                        minHeight: '20px',
                        lineHeight: '20px'
                    }
                },
                MuiTypography : {
                    body1 : {
                        fontFamily : 'roboto_light',
                        fontSize   : '0.95rem'
                    },
                    root : {
                        color : (theme=='light') ? '#000' : '#FFF'
                    }
                },
                MuiToolbar : {
                    root : {

                    }
                },
                MuiButton : {
                    label : {
                        color : (theme=='light')?'#000':'#FFF',
                        fill : (theme=='light')?'#000':'#FFF'
                    },
                    disabled : {
                        color : (theme=='light') ? 
                                    'rgba(0,0,0,0.26)' :
                                    'rgba(255,255,255,0.26)'
                    }
                },
                MuiAppBar : {
                    colorPrimary : {
                        color : '#FFF',
                        backgroundColor : (theme=='light') ? '#000' : grey[800],
                        position : 'relative',
                        minHeight : '56px',
                        transition : '0.5s all'
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
                        color : (theme==Themes.LIGHT) ? 
                                    '#000000' : '#FFFFFF'
                    }
                },
                MuiPaper : {
                    root : {
                        backgroundColor : (theme==Themes.LIGHT) ? 
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
                            let rgbColor = ((theme==Themes.LIGHT) ? 
                                '0, 0, 0' : '120, 120, 120'
                            );

                            let strength = 1;
                        
                            return `0px 2px 4px -1px rgba(${rgbColor}, ${0.2*strength}), ` + 
                                   `0px 4px 5px 0px rgba(${rgbColor}, ${0.14*strength}), ` + 
                                   `0px 1px 10px 0px rgba(${rgbColor}, ${0.12*strength})`;
                        })()
                    }
                },
                MuiTooltip : {
                    tooltip : {
                        backgroundColor : theme == Themes.LIGHT ? '#000' : pink[700],
                        fontSize : '11pt',
                        padding  : '4px 8px',
                        minHeight: '20px',
                        lineHeight: '20px'
                    },
                    popper : {
                        opacity : 0.7
                    }
                }
            }
        });
    }

    return themes[theme];
};

export default { themes, getTheme };
export { themes };