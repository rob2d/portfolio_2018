import {
    mdiHumanGreeting,
    mdiBriefcase,
    mdiDiceMultiple,
    mdiFileDocumentBox
} from '@mdi/js';

export const SectionIndexes = {
    WELCOME : 0,
    PROJECTS : 1,
    MISC : 2,
    CV : 3
};

export const Sections = [
    {
        name : 'About',
        iconPath : mdiHumanGreeting,
        getTooltipText : () => 'About',
        basePath : '/',
    },
    {
        name : 'Projects',
        iconPath : mdiBriefcase,
        getTooltipText : () => 'Projects',
        basePath : '/projects'
    },
    {
        name : 'Misc',
        iconPath : mdiDiceMultiple,
        getTooltipText : () => 'Miscellaneous',
        basePath : '/misc'
    },
    {
        name : 'CV',
        iconPath : mdiFileDocumentBox,
        getTooltipText  : () => 'CV',
        basePath : '/cv'
    }
];


export const pathIndexLookup = Object.fromEntries(
    Sections.map((s,i) => ([s.basePath, i]))
);

export default { SectionIndexes, Sections, pathIndexLookup };
