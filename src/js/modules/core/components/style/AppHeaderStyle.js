const styleSheet = (theme) =>
({
    appBar :
    {
        backgroundColor : theme.palette.text.primary,
        position        : 'relative',
    },
    contactButtonContainer :
    {
        display : 'inline-flex',
        justifyContent : 'center',
        flexDirection  : 'column'
    },
    contactButtonIcon :
    {
        position   : 'relative',
        margin     : '0 auto',
        textAlign  : 'center',
        display    : 'inline-block',
        textIndent : '0',
        fontSize   : '16pt'
    },
    rightContainer :
    {
        textAlign      : 'right',
        height         : '100%',
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'flex-end',
        position       : 'relative'
    },
    leftIconsWrapper :
    {
        width          : '240px',
        height         : '100%',
        color          : '#FFFFFF',
        justifyContent : 'center',
        alignItems     : 'center',
        display        : 'flex',
        flexDirection  : 'row',
    },
    rightIconsWrapper :
    {
        textAlign      : 'right',
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        flexDirection  : 'row',
        height         : '100%',
        color          : '#FFFFFF'
    },
    centerPadder :
    {
        flex : 1,
        display : 'flex'
    },
    myNameText :
    {
        textAlign   : 'right',
        marginRight : '16px',
        fontSize   : '16pt',
        lineHeight : '17pt',
        display    : 'block',
        color      : "#FFFFFF"
    },
    '@media (max-width: 400px)':
    {
        contactButton : { minWidth : '68px' }
    },
});

export default styleSheet