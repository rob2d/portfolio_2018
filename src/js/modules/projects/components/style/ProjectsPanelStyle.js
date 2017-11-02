const styleSheet = (theme) =>
({
    container :
    {
        display        : 'block',
        position       : 'relative',
        flexGrow       : 1,
        maxWidth       : '1100px',
        margin         : '0 auto',
        top            : '0px',
        overflowX      : 'hidden'
    },
    content :
    {
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        flexDirection  : 'row',
        flexWrap       : 'wrap',
        position       : 'relative',
        marginTop      : '16px'
    },
    '@media (min-width: 600px)': {
        mainContainer : {
            padding : '32px',
        },
    },
    '@media (max-height: 480px)':{
        mainContainer : {
            paddingTop : '0px'
        }
    }
});

export default styleSheet