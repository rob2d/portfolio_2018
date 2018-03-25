import { menus } from 'strings'

export default { 
    SectionIndexes : {
        WELCOME  : 0,
        PROJECTS : 1,
        CV       : 2,
        MISC     : 3
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
            name         : 'CV',
            iconClass    : 'mdi mdi-file-document-box',
            getTooltipText  : ()=>(menus.main.cv),
            basePath     : '/cv'
        },
        {
            name         : 'More',
            iconClass    : 'mdi mdi-dice-multiple',
            getTooltipText : ()=>(menus.main.misc),
            basePath       : '/misc'
        }
    ]
};