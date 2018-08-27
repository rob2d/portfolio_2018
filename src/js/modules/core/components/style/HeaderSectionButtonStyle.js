const styleSheet = {
    container : {
        display : 'block'
    },
    button : {
        display    : 'block',
        color      : '#FFFFFF !important',
        height     : 'auto',
        lineHeight : '24px',
        padding    : '8px',
        minWidth   : '60px'
    },
    buttonIconWrapper : {
        display : 'block'
    },
    buttonIcon : {
        fontSize : '18pt',
        position : 'relative',
        top      : '2px'
    },
    // TODO : use constant to make
    //        tooltip style DRY
    tooltip : {
        fontSize : '11pt',
        padding  : '4px 8px',
        minHeight: '20px',
        lineHeight: '20px'
    },
    '@media (max-width: 400px)': {
        button : { minWidth : '68px' }
    }
};

export default styleSheet