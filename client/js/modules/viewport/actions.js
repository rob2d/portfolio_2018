export const REFRESH_WINDOW_DIMENSIONS = 'viewport/REFRESH_WINDOW_DIMENSIONS';

export const refreshWindowDimensions = ()=> ({
    type : REFRESH_WINDOW_DIMENSIONS,
    payload : {}
});

export default { 
    REFRESH_WINDOW_DIMENSIONS,
    refreshWindowDimensions
}