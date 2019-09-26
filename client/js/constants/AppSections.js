import { menus } from 'strings';
import { 
    mdiHumanGreeting, 
    mdiBriefcase,
    mdiDiceMultiple,
    mdiFileDocumentBox
} from '@mdi/js';

export const SectionIndexes = {
    WELCOME  : 0,
    PROJECTS : 1,
    MISC     : 2,
    CV       : 3
};

export const Sections = [
    {
        name : 'About',
        iconPath : mdiHumanGreeting,
        iconClass : 'mdi mdi-human-greeting',
        getTooltipText : () => menus.main.about,
        basePath : '/',
    },
    {
        name : 'Projects',
        iconPath : mdiBriefcase,
        iconClass : 'mdi mdi-briefcase',
        getTooltipText : ()=> menus.main.projects,
        basePath : '/projects'
    },
    {
        name : 'Misc',
        iconPath : mdiDiceMultiple,
        getTooltipText : ()=> menus.main.misc,
        basePath       : '/misc'
    },
    {
        name            : 'CV',
        iconPath : mdiFileDocumentBox,
        getTooltipText  : ()=> menus.main.cv,
        basePath        : '/cv'
    }
];

export default { 
    SectionIndexes,
    Sections
};