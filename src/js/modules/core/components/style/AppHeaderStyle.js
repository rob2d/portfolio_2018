import theme from 'app-root/baseTheme'
import { Sections } from 'constants/AppSections'

const SECTION_COUNT   = Sections.length,
      BUTTON_WIDTH_PX = 60;

const styleSheet = 
{
    appBar : {
        backgroundColor : theme.palette.text.primary,
        position        : 'relative',
        minHeight       : '56px' // needed to prevent gutters 
    },                           // from resizing
    rightContainer : {
        textAlign      : 'right',
        height         : '100%',
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'flex-end',
        position       : 'relative'
    },
    leftIconsWrapper : {
        position       : 'relative',
        width          : `${SECTION_COUNT * BUTTON_WIDTH_PX}px`,
        height         : '100%',
        color          : '#FFFFFF !important',
        justifyContent : 'center',
        alignItems     : 'center',
        display        : 'flex',
        flexDirection  : 'row',
    },
    rightIconsWrapper : {
        textAlign      : 'right',
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        flexDirection  : 'row',
        height         : '100%',
        color          : '#FFFFFF'
    },
    centerPadder : {
        flex : 1,
        display : 'flex'
    },
    myNameText : {
        textAlign   : 'right',
        marginRight : '16px',
        fontSize   : '16pt',
        lineHeight : '17pt',
        display    : 'block',
        color      : "#FFFFFF"
    },
    
};

export default styleSheet