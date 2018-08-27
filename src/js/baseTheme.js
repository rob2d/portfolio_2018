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
        }
    }
});

export default theme;