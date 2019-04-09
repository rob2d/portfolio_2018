/**
 * For mobile portrait views (full desktop has slightly
 * different variation), we take certain actions
 * if we determine we're in portrait mode
 */
function isPortrait(vpW, vpH) {
    return (vpW <= 420) && (vpH > vpW);
}

export default isPortrait