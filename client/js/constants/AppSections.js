import { menus } from 'strings'

export default { 
    SectionIndexes : {
        WELCOME  : 0,
        PROJECTS : 1,
        MISC     : 2,
        CV       : 3
    },
    Sections : [
        {
            name         : 'About',
            iconClass    : 'mdi mdi-human-greeting',
            getTooltipText  : ()=>(menus.main.about),
            basePath     : '/'
        },
        {
            name         : 'Projects',
            iconClass    : 'mdi mdi-briefcase',
            getTooltipText  : ()=>(menus.main.projects),
            basePath     : '/projects'
        },
        {
            name         : 'Misc',
            iconClass    : 'mdi mdi-dice-multiple',
            getTooltipText : ()=>(menus.main.misc),
            basePath       : '/misc'
        },
        {
            name         : 'CV',
            iconClass    : 'mdi mdi-file-document-box',
            getTooltipText  : ()=>(menus.main.cv),
            basePath     : '/cv'
        }
    ]
};