import { createMuiTheme } from '@material-ui/core/styles'
import indigo from '@material-ui/core/colors/indigo'
import red from '@material-ui/core/colors/red'
import pink from '@material-ui/core/colors/pink'

const theme = createMuiTheme({
    palette: {
        primary : indigo, 
        accent  : pink,
        error   : red
    },
    overrides : {
        MuiTypography : {
          body1 : {
            fontFamily : 'roboto_light',
            fontSize   : '0.95rem'
          }
        },
        MuiToolbar : {
            root : {

            }
        },
        MuiAppBar : {
            colorPrimary : {
                color : '#FFFFFF',
                backgroundColor : '#000000'
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
            colorAccent : {
                color : pink[400]
            }
        },
        MuiPaper : {
            elevation1 : {
                
                // just needed to get around
                // issue with card anims

                boxShadow : 'none'
            }
        }
    }
});

export default theme;