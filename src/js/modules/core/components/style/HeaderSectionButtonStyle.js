const styleSheet = {
    container : {
        display : 'block'
    },
    button : {
        display    : 'block !importanst',
        color      : '#FFFFFF !important',
        height     : 'auto !important',
        lineHeight : '24px !important',
        padding    : '8px !important',
        minWidth   : '60px !important'
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
        fontSize : '11pt !important',
        padding  : '4px 8px !important',
        minHeight: '20px !important',
        lineHeight: '20px !important'
    },
    '@media (max-width: 400px)': {
        button : { minWidth : '68px' }
    }
};

export default styleSheet