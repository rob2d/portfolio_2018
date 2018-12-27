import { menus } from 'strings'

export const SectionIndexes = {
    WELCOME  : 0,
    PROJECTS : 1,
    MISC     : 2,
    CV       : 3
};

export const Sections = [
    {
        name            : 'About',
        iconClass       : 'mdi mdi-human-greeting',
        getTooltipText  : () => menus.main.about,
        basePath        : '/',
        svg             : ''
    },
    {
        name            : 'Projects',
        iconClass       : 'mdi mdi-briefcase',
        getTooltipText  : ()=> menus.main.projects,
        basePath        : '/projects'
    },
    {
        name           : 'Misc',
        iconClass      : 'mdi mdi-dice-multiple',
        getTooltipText : ()=> menus.main.misc,
        basePath       : '/misc'
    },
    {
        name            : 'CV',
        iconClass       : 'mdi mdi-file-document-box',
        getTooltipText  : ()=> menus.main.cv,
        basePath        : '/cv'
    }
];

export default { 
    SectionIndexes,
    Sections
};