/**
 * For mobile portrait views (full desktop has slightly
 * different variation), we take certain actions
 * if we determine we're in portrait mode
 */
function isPortrait(viewportWidth, viewportHeight) {
    return (viewportWidth <= 420) && (viewportHeight > viewportWidth);
}

export default isPortrait