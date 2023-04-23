import C from 'color';
import { createTheme, adaptV4Theme } from '@mui/material/styles';
import deepMerge from 'utils/themer/deepMerge';
import createDerivedTheme from 'utils/themer/createDerivedTheme';

const themeDefs = { light: [], dark: [] };

const commonRules = {
    overrides: {
        MuiTooltip: {
            popper: {
                fontSize: '11pt',
                padding: '4px 8px',
                minHeight: '20px',
                lineHeight: '20px',
                opacity: 0.74,
            },
            tooltip: {
                fontSize: '11pt',
                padding: '4px 8px',
                letterSpacing: '0.04rem',
                minHeight: '20px',
                lineHeight: '20px'
            }
        },
        MuiTypography: {
            body1: {
                fontFamily: 'Barlow',
                fontSize: '1rem',
                lineHeight: '1.4rem'
            },
            subtitle1: {
                fontFamily: 'Barlow',
                fontSize: '1.1rem',
                fontWeight: 600,
                lineHeight: '1.5rem'
            },
            subtitle2: {
                fontFamily: 'Barlow',
                fontSize: '1.1rem',
                fontWeight: 600,
                lineHeight: '1.5rem'
            },
            caption: {
                fontFamily: 'Barlow',
                fontSize: '0.9rem',
                fontWeight: 500,
                lineHeight: '1.0rem'
            },
            h3: {
                fontFamily: 'Barlow',
                fontSize: '1.3rem',
                letterSpacing: '0.045em',
                fontWeight: 600
            },
            h5: {
                fontFamily: 'Barlow',
                fontSize: '1.05rem',
                fontWeight: 500,
                lineHeight: '1.5rem'
            }
        },
        MuiAppBar: {
            root: {
                position: 'relative',
                minHeight: '48px',
                transition: '0.5s all'
            },
            positionFixed: {

                // started off with previous version,
                // so this keeps things playing nicely

                position: 'relative'
            }
        },
        MuiPaper: {
            elevation1: { // for card anims
                boxShadow: 'none'
            }
        }
    }
};

themeDefs.light.push({
    palette: {
        mode: 'light',
        primary: {
            main: '#212130',
            dark: '#000'
        },
        secondary: {
            main: '#ec407a',
            dark: '#c51162'
        },
        accent: {
            main: '#00b8d4',
            dark: '#00a2c1'
        },
        common: {
            white: '#FFF',
            black: '#000',
            background1: '#FFF',
            active: '#00b8d4',
            shadow: '#000',
            contrast: '#FFF'
        },
        text: {
            primary: '#000',
            secondary: '#30304b'
        }
    }
});

themeDefs.dark.push({
    type: 'dark',
    palette: {
        primary: {
            main: '#30304b',
            dark: '#292938'
        },
        secondary: {
            main: '#ec407a',
            dark: '#c51162'
        },
        common: {
            background1: '#121212',
            white: '#FFF',
            black: '#000',
            active: '#00b8d4',
            shadow: '#272736',
            contrast: '#f1f1ff'
        },
        text: {
            primary: '#b8b8d3',
            secondary: '#53364d'
        }
    }
});

Object.keys(themeDefs).forEach( type => {

    // assign base palette type field
    // for MUI  (light/dark)

    themeDefs[type][0].palette.mode = type;

    // apply rules in common

    themeDefs[type][0] = deepMerge(
        commonRules,
        themeDefs[type][0]
    );

});

// generate next layer rules based
// on themes/common definitions

Object.keys(themeDefs).forEach( type => {
    const [{
        palette: { primary, secondary, common, text }
    }] = themeDefs[type];

    themeDefs[type].push({
        overrides: {
            MuiAppBar: {
                root: {
                    boxSizing: 'border-box'
                },
                colorPrimary: {
                    backgroundColor: `${primary.dark} !important`,
                    '& .MuiButton-root': {
                        backgroundColor: `${C(common.white).alpha(0).rgb()}`,
                        transition: 'background-color 0.40s ease'
                    },
                    '& .MuiButton-root:hover': {
                        backgroundColor: `${C(common.white).alpha(0.16).rgb()}`,
                    }
                }
            },
            MuiCircularProgress: {
                root: {
                    color: secondary.main
                },
                colorPrimary: {
                    color: text.primary
                }
            },
            MuiPaper: {
                root: {
                    backgroundColor: `${common.background1} !important`
                },
                elevation4: {
                    boxShadow: `0px 2px 4px -1px ${C(common.shadow).alpha(0.2)}, ` +
                                `0px 4px 5px 0px ${C(common.shadow).alpha(0.14)}, ` +
                                `0px 1px 10px 0px ${C(common.shadow).alpha(0.12)}`
                }
            },
            MuiTooltip: {
                tooltip: {
                    backgroundColor: primary.dark
                }
            }
        }
    });
});

const themes = {};

/**
 * grabs a theme; otherwise creates and caches a theme
 * corresponding to the theme entered
 */
const getTheme = theme => {
    if(!themes[theme]) {
        themes[theme] = createTheme(
            adaptV4Theme(createDerivedTheme(themeDefs[theme]))
        );
    }

    return themes[theme];
};

export default { themes, themeDefs, getTheme };
export { themes, themeDefs, getTheme };
