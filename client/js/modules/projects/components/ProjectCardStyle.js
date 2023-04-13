import { makeStyles } from '@material-ui/core/styles';

const ANIM_S = '0.32';
const getTopMargin = vpW => vpW > 800 ? 32: 16;

// TODO: inline these styles once project cards
// are broken down into different state-components
// (vs all handled via this one mutating component)

export default makeStyles(({ palette: { type, text, common } }) => ({
    container: {
        position: p => p.hasAbsolutePosition ? 'absolute': 'relative',
        opacity: p => p.isShown ? 1 : 0,
        display: p => p.onScreen ? 'block': 'none',
        top: p => p.hasAbsolutePosition ? (p.offsetTop - getTopMargin(p.vpW)) : 'auto',
        left: p => p.hasAbsolutePosition ? p.offsetLeft : 'auto',
        textAlign: 'left',
        transition: p => {
            const moveTiming = `${(p.hasAbsolutePosition ? (ANIM_S * 1.5) : 0)}s`;

            return (
                `opacity ${ANIM_S}s, ` +
                `left ${moveTiming}, top ${moveTiming}`
            );
        },
        width: p => `${p.viewAsTitle ? 400 : 300}px`,
        height: p => `${(p.viewAsTitle ? 80: 324)}px`,
        marginTop: p => `${getTopMargin(p.vpW)}px`,
        marginBottom: p => `${p.viewAsTitle ? 0: 32}px`,
        cursor: p => p.viewAsTitle ? 'text': 'pointer',

        // actively moving cards should be forced above
        // existing relatively-placed content

        zIndex: p => p.hasAbsolutePosition? 1: 0,
        pointerEvents: 'all',
        overflow: 'hidden'
    },
    '@media (min-width: 800px)': {
        container: {
            paddingLeft: '32px',
            paddingRight: '32px'
        },
    },
    '@media (max-width: 800px)': {
        container: {
            paddingLeft: '16px',
            paddingRight: '16px'
        }
    },
    '@media (max-width: 400px)': {
        container: {
            paddingLeft: '8px',
            paddingRight: '8px'
        }
    },
    cardMediaContent: {
        position: 'relative',
        display: 'block',
        width: '100%',
        opacity: 1,
        transition: `all ${ANIM_S}s ease-out`,
        height: p => `${
            ((p.viewAsTitle && 100) || (p.isHighlighted ? 324 : 180))
        }px`,
        padding: p => p.isHighlighted && '0px',
        overflow: 'hidden',
        border: 0
    },
    cardContainerBase: {
        width: '300px',
        height: '320px',
        padding: '0px !important',
        display: 'block !important',
        flexDirection: 'column !important',
        overflow: 'hidden !important',
        boxShadow: () => {
            const l = type == 'light';
            const rgb = l ? '0,0,0': '255,255,255';
            const shadowStrength = l ? 1: 2;

            return (`0px 1px 3px 0px rgba(${rgb}, ${0.2*shadowStrength}), ` +
                    `0px 1px 1px 0px rgba(${rgb}, ${0.14*shadowStrength}), ` +
                    `0px 2px 1px -1px rgba(${rgb}, ${0.12*shadowStrength})`
            );
        },
        transition: `box-shadow ${ANIM_S}s ease-out, ` +
                        `transform ${ANIM_S*2}s ` +
                        `cubic-bezier(0.25, 0.1, 0.5, 1), ` +
                        `background-color ${ANIM_S}s !important`,
        '@media (max-width: 400px)': { // support for smaller devices
            width: '300px !important'
        }
    },
    cardContainerAsTitle: {
        boxShadow: 'none !important',
        width: '420px !important',
        height: '80px !important',
        transform: 'rotateY(360deg) !important'
    },
    cardContent: {
        height: '88px',
        transition: `all ${ANIM_S}s ease-out`,
        opacity: p => (!p.highlightedOnPanel) ? 1: 0
    },
    titleOverlay: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        marginBottom: '0px',
        marginTop: '0px',
        bottom: '0px',
        width: '100%',
        height: p => `${!p.viewAsTitle ? 40 : 100}%`,
        backgroundColor: p => ( `rgba(0,0,0,${
            (!p.viewAsTitle?'0.52':'0')})`
        )
    },
    displayName: {
        display: 'block',
        width: '100%',
        minWidth: p => `${(!p.viewAsTitle) ? 300: 400}px`,
        '@media (max-width: 400px)': { // adding support for smaller
            fontSize: p => (!p.viewAsTitle) ? '16pt': '20pt' // iPhone5
        },
        paddingLeft: '16px',
        fontWeight: 700,
        fontSize: p => p.viewAsTitle ? '24pt': '16pt',
        marginTop: '0px',
        marginBottom: '0px',
        color: p => p.viewAsTitle ? text.primary : common.contrast,
        transition: `all ${ANIM_S}s ease-in`
    },
    subtitle: {
        display: 'block',
        position: 'relative',
        left: p => (!p.viewAsTitle) ? '0px': '2px',
        width: '100%',
        paddingLeft: '16px',
        fontSize: '12.5pt',
        fontWeight: p => p.viewAsTitle ? 700: 500,
        color: p => p.viewAsTitle ? text.primary : common.contrast,
        marginTop: '0',
        marginBottom: '0px',
        lineHeight: p => p.isHighlighted ? '36px': '0px',
        opacity: p => p.isHighlighted ? 1: 0,
        transition: `all ${ANIM_S}s ease-in`,
    },
    moreInfoButton: {
        position: 'absolute',
        right: '16px',
        color: common.contrast,
        fill: common.contrast,
        fontSize: '22pt',
        opacity: p => (p.isHighlighted && !p.viewAsTitle) ? 1: 0,
        transition: `all ${ANIM_S}s ease-in`
    },
    cardMediaImg: {
        position: 'relative',
        width: p => {
            if(!p.viewAsTitle) { return 'auto' }
            else { return `${p.isHighlighted?125:100}%` }
        },
        verticalAlign: 'middle',
        margin: '0 auto',
        left: p => `${p.isHighlighted?-25:0}%`,
        top: '0%',
        opacity: p => (!p.viewAsTitle) ? 1: 0,
        height: p => `${
            (p.viewAsTitle && 100) ||
            (p.isHighlighted ? 324: 180)
        }px`,
        transition: `all ${ANIM_S}s ease-out`,
        '& *': {
            width: 'auto !important',
            height: '100% !important',
            transition: `all ${ANIM_S}s ease-out`
        }
    }
}), { name: 'ProjectCard' });
