function createConstant(str) {
    return `DisplayStates.${str}`;
}

export const VIEW_ALL = createConstant('VIEW_ALL');
export const PROJECT_FADE_TO = createConstant('PROJECT_FADE_TO');
export const OFFSET_CALC = createConstant('OFFSET_CALC');
export const AFTER_FADE_POSITIONING = createConstant('AFTER_FADE_POSITIONING');
export const PROJECT_SCROLL_UP = createConstant('PROJECT_SCROLL_UP');
export const PROJECT_VIEW = createConstant('PROJECT_VIEW');

export default {
    VIEW_ALL,
    PROJECT_FADE_TO,
    OFFSET_CALC,
    AFTER_FADE_POSITIONING,
    PROJECT_SCROLL_UP,
    PROJECT_VIEW
};
