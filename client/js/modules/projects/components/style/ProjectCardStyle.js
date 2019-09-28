import { makeStyles } from '@material-ui/styles';

const ANIM_INTERVAL = '0.32';
const getTopMargin = vpW => vpW > 800 ? 32 : 16;

export default makeStyles(({ palette : { type }}) => ({
    container : {
        opacity : p => p.isShown ? 1 : 0,
        display : p => p.onScreen ? 'block' : 'none',
        position : p => p.hasAbsolutePosition ? 'absolute' : 'relative',
        top : p => ((!p.hasAbsolutePosition && 'auto') || 
            (p.offsetY - getTopMargin(p.vpW))
        ),
        left : p => ((!p.hasAbsolutePosition && 'auto') || 
            p.offsetX
        ),
        transition: p => (
            'opacity ${ANIM_INTERVAL}s, ' + ( p.hasAbsolutePosition ?
                `left ${ANIM_INTERVAL*1.5}s, ` + 
                `top ${ANIM_INTERVAL*1.5}s`:
                'left 0s, top 0s'
            )
        ),
        width : p => p.viewAsTitle ? '400px' : '300px',
        height : p => `${(p.viewAsTitle ? 80 : 324 )}px`,
        marginTop : p => `${getTopMargin(p.vpW)}px`,
        marginBottom : p => `${ p.viewAsTitle ? 0 : 32 }px`,
        textAlign : 'left',
        cursor : p => p.viewAsTitle ? 'text' : 'pointer',
        
        // actively moving cards should be forced above
        // existing relatively-placed content

        zIndex : p => p.hasAbsolutePosition? 1 : 0,

        pointerEvents : 'all',
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
            paddingLeft : '16px',
            paddingRight : '16px'
        }
    },
    '@media (max-width: 400px)': {
        container : {
            paddingLeft : '8px',
            paddingRight : '8px'
        },
    },
    cardMediaContent : {
        position : 'relative',
        display : 'block',
        width : '100%',
        opacity : 1,
        transition: `all ${ANIM_INTERVAL}s ease-out`,
        height : p => (
            ((p.viewAsTitle && 100) || 
            (p.isHighlighted ? 324 : 180)) + 
            'px'
        ),
        padding : p => p.isHighlighted && '0px',
        overflow  : 'hidden',
        border : 0
    },
    cardContainerBase : {
        width : '300px',
        height : '320px',
        padding : '0px !important',
        display : 'block !important',
        flexDirection : 'column !important',
        overflow : 'hidden !important',
        boxShadow : ()=> {
            const l = type == 'light';
            const rgb = l ? '0,0,0' : '255,255,255';
            const shadowStrength = l ? 1 : 2;

            return (`0px 1px 3px 0px rgba(${rgb}, ${0.2*shadowStrength}), ` +
                    `0px 1px 1px 0px rgba(${rgb}, ${0.14*shadowStrength}), ` + 
                    `0px 2px 1px -1px rgba(${rgb}, ${0.12*shadowStrength})`
            );
        }, 
        transition : `box-shadow ${ANIM_INTERVAL}s ease-out, ` +
                        `transform ${ANIM_INTERVAL*2}s ` + 
                        `cubic-bezier(0.25, 0.1, 0.5, 1), ` + 
                        `background-color ${ANIM_INTERVAL}s !important`,
        '@media (max-width: 400px)': {  // support for smaller devices
            width : '300px !important'
        }
    },
    cardContainerAsTitle : {
        boxShadow : 'none !important',
        width : '420px !important',
        height : '80px !important',
        transform : 'rotateY(360deg) !important'
    },
    cardContent : {
        height : '88px',
        transition : `all ${ANIM_INTERVAL}s ease-out`,
        opacity : p =>(!p.highlightedOnPanel) ? 1 : 0
    },
    titleOverlay : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        position : 'absolute',
        marginBottom : '0px',
        marginTop : '0px',
        bottom : '0px',
        width : '100%',
        height : p => (!p.viewAsTitle ? 40 : 100)+'%',
        backgroundColor : p => ( 'rgba(0,0,0,' + 
            (!p.viewAsTitle?'0.52':'0') + ')'
        )
    },
    projectTitle : {
        display : 'block',
        width : '100%',
        minWidth : p => ((!p.viewAsTitle) ? 300 : 400) + 'px',
          '@media (max-width: 400px)': {  // adding support for smaller
           fontSize : p => (!p.viewAsTitle) ? '16pt' : '20pt' // iPhone5
        },
        paddingLeft : '16px',
        fontFamily : 'roboto_bold',
        fontSize : p => p.viewAsTitle ? '24pt' : '16pt',
        fontWeight : p => p.viewAsTitle ? 700 : 500,
        marginTop : '0px',
        marginBottom : '0px',
        color : p => ((type=='light') && 
            (!p.viewAsTitle ? '#FFF' : '#000' ) || '#FFF'
        ),
        transition : `all ${ANIM_INTERVAL}s ease-in`
    },
    projectSubtitle : {
        display : 'block',
        position : 'relative',
        left : p => (!p.viewAsTitle) ? '0px' : '16px',
        width : '100%',
        paddingLeft : '16px',
        fontSize : '12.5pt',
        fontFamily : 'roboto_regular',
        fontWeight : p => p.viewAsTitle ? 700 : 500,
        color :  p => ((type != ('light')) && '#FFF' ||
            (!p.viewAsTitle? '#FFF':'#000')
        ),
        marginTop : '0',
        marginBottom : '0px',
        lineHeight : p => p.isHighlighted ? '24px' : '0px',
        opacity : p => p.isHighlighted ? 1 : 0,
        transition : `all ${ANIM_INTERVAL}s ease-in`,
    },
    moreInfoButton : {
        position : 'absolute',
        right : '16px',
        color : '#FFF',
        fill : '#FFF',
        fontSize : '22pt',
        opacity : p => (p.isHighlighted && !p.viewAsTitle) ? 1 : 0,
        transition : `all ${ANIM_INTERVAL}s ease-in`
    },
    cardMediaImg : {
        position : 'relative',
        width : p => (!p.viewAsTitle) ? 'auto' : '100%',
        height : '100%',
        verticalAlign : 'middle',
        transition : `all ${ANIM_INTERVAL}s ease-out`,
        margin : '0 auto',
        left : p => p.isHighlighted ? '-25%' : '0%',
        top : '0%',
        opacity : p => (!p.viewAsTitle) ? 1 : 0
    }
}), { name : 'ProjectCard' })