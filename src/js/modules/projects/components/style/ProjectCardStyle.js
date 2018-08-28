import shouldShowHoverContent from 'tools/shouldShowHoverContent'

const ANIM_INTERVAL = '0.32';

const base = {
    cardContainer : {
        width         : '300px !important',
        height        : '300px !important',
        padding       : '0px !important',
        display       : 'block !important',
        flexDirection : 'column !important',
        overflow      : 'hidden !important',
        boxShadow     : '0px 1px 3px 0px rgba(0, 0, 0, 0.2), ' +
                        '0px 1px 1px 0px rgba(0, 0, 0, 0.14), ' + 
                        '0px 2px 1px -1px rgba(0, 0, 0, 0.12) !important', 
        transition    : `box-shadow ${ANIM_INTERVAL}s ease-out, ` +
                        `transform ${ANIM_INTERVAL*2}s cubic-bezier(0.25, 0.1, 0.5, 1) !important`,
        '@media (max-width: 400px)': {  // support for smaller devices
            width : '300px !important'
        }
    }
};

const styleSheet = {
    container : {
        opacity: ({isShown}) => (isShown ? '1' : '0'),
        display: ({ onScreen })=>(onScreen ? 'block' : 'none'),
        position: ({ hasAbsolutePosition })=>(
            hasAbsolutePosition ? 'absolute' : 'relative'
        ),
        top: ({ hasAbsolutePosition, offsetY })=>(
            hasAbsolutePosition ? (offsetY - 32) : 'auto'
        ),
        left: ({hasAbsolutePosition, offsetX, data})=>(
            hasAbsolutePosition ? offsetX : 'auto'
        ),
        transition: ({ hasAbsolutePosition })=>(
            `opacity ${ANIM_INTERVAL}s, ${hasAbsolutePosition?
                        `left ${ANIM_INTERVAL*1.5}s, top ${ANIM_INTERVAL*1.5}s`:
                        'left 0s, top 0s'}`
        ),
        width        : ({ viewAsTitle })=> (viewAsTitle ? '400px' : '300px'),
        height       : '308px',
        marginTop    : '32px',
        marginBottom : '32px',
        textAlign    : 'left',
        cursor       : 'pointer',
        // actively moving cards should be forced above existing relatively
        // placed content
        zIndex       : ({ hasAbsolutePosition })=>(hasAbsolutePosition? 1 : 0),
        pointerEvents : ({ viewAsTitle })=> (!viewAsTitle ? 'all':'none'),
        overflow : 'hidden'
    },
    '@media (min-width: 800px)': {
        container : {
            paddingLeft: '32px',
            paddingRight: '32px'
        },
    },
    '@media (max-width: 800px)': {
        container : {
            paddingLeft: '24px',
            paddingRight: '24px'
        },
    },
    '@media (max-width: 400px)': {
        container : {
            paddingLeft: '8px',
            paddingRight: '8px'
        },
    },
    cardMediaContent : {
        position : 'relative',
        width    : '100%',
        opacity  : 1,
        transition: `all ${ANIM_INTERVAL}s ease-out`,
        height    : ({ isHighlighted, viewAsTitle })=>{
            if(!viewAsTitle) {
                return isHighlighted?'300px':'180px';                
            } else {
                return '100px'; // width of content when title size
            }
        },
        padding   : ({ isHighlighted })=>( isHighlighted?'0px':undefined ),
        overflow  : 'hidden',
        border : 0
    },
    cardContainerAsTitle : Object.assign({}, base.cardContainer, {
        boxShadow : 'none !important',
        width     : '420px !important',
        height    : '80px !important',
        transform : 'rotateY(360deg) !important'
    }),
    cardContainer : Object.assign({}, base.cardContainer),
    cardContent : {
        height     : '88px',
        transition : `all ${ANIM_INTERVAL}s ease-out`,
        opacity    : ({ highlightedOnPanel })=>((!highlightedOnPanel) ? 1 : 0)
    },
    titleOverlay : {
        display         : 'flex',
        flexDirection   : 'column',
        justifyContent  : 'center',
        position        : 'absolute',
        marginBottom    : '0px',
        marginTop       : '0px',
        bottom          : '0px',
        width           : '100%',
        height          : ({viewAsTitle})=>(!viewAsTitle?'40%':'100%'),
        backgroundColor : ({viewAsTitle})=>(!viewAsTitle?'rgba(0,0,0,0.52)':'rgba(0,0,0,0)')
    },
    projectTitle : {
        display      : 'block',
        width        : '100%',
        minWidth     : ({viewAsTitle})=>(!viewAsTitle?'300px':'400px'),
          '@media (max-width: 400px)': {  // adding support for smaller
           fontSize : '20pt'              // devices such as iPhone5
        },
        paddingLeft  : '16px',
        fontSize     : ({ viewAsTitle })=>( viewAsTitle ? '24pt' : '18pt' ),
        fontWeight   : ({ viewAsTitle })=>(viewAsTitle ? 700 : 500),
        marginTop    : '0px',
        marginBottom : '0px',
        color        : ({ viewAsTitle })=>(!viewAsTitle?'#FFFFFF':'#000000'),
        transition   : `all ${ANIM_INTERVAL}s ease-in`
    },
    projectSubtitle : {
        display      : 'block',
        position     : 'relative',
        left         : ({ viewAsTitle })=>( !viewAsTitle ? '0px' : '16px' ),
        width        : '100%',
        paddingLeft  : '16px',
        fontSize     : '13pt',
        fontWeight   : ({ viewAsTitle })=>(viewAsTitle ? 700 : 500),
        color        :  ({ viewAsTitle })=>( !viewAsTitle? '#FFFFFF':'#000000' ),
        marginTop    : '0',
        marginBottom : '0px',
        lineHeight   : ({ isHighlighted })=>(isHighlighted?'20px':'0px'),
        opacity      : ({ isHighlighted })=>(isHighlighted?1:0),
        transition   : `all ${ANIM_INTERVAL}s ease-in`,
    },
    moreInfoButton : {
        position   : 'absolute',
        right      : '16px',
        color      : '#FFFFFF',
        fontSize   : '22pt',
        opacity    : ({ isHighlighted, viewAsTitle })=>(isHighlighted&&(!viewAsTitle)?1:0),
        transition : `all ${ANIM_INTERVAL}s ease-in`
    },
    cardActions : {
        justifyContent : 'flex-end'
    },
    cardActionButton : {
        fontFamily : 'roboto_medium'
    },
    cardMediaImg : {
        position      : 'relative',
        width         : ({ viewAsTitle }) => (!viewAsTitle?'auto':'100%'),
        height        : '100%',
        verticalAlign : 'middle',
        transition    : `all ${ANIM_INTERVAL}s ease-out`,
        margin        : '0 auto',
        left          : ({ isHighlighted }) => (isHighlighted?'-25%':'0%'),
        top           : '0%',
        opacity       : ({ viewAsTitle }) => (!viewAsTitle?1:0)
    }
};

export default styleSheet