function newConst (str) {
    return `DisplayStates.${str}`;
}

export const VIEW_ALL = newConst('VIEW_ALL');
export const PROJECT_FADE_TO = newConst('PROJECT_FADE_TO');
export const OFFSET_CALCULATION = newConst('OFFSET_CALCULATION');
export const AFTER_FADE_POSITIONING = newConst('AFTER_FADE_POSITIONING');
export const PROJECT_SCROLL_UP = newConst('PROJECT_SCROLL_UP');
export const PROJECT_VIEW = newConst('PROJECT_VIEW');   

export default {
    VIEW_ALL,
    PROJECT_FADE_TO,
    OFFSET_CALCULATION,
    AFTER_FADE_POSITIONING,
    PROJECT_SCROLL_UP,
    PROJECT_VIEW
}