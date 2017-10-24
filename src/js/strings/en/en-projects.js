/**
 * TODO : use MongoDB instead of shoving crap in here
 * TODO | (works for now though)
 *
 * TODO : SHORT DESCRIPTIONS -> for the projects overview
 */

export default
{
    moreInfo : 'More Info',
    projectData :
    [
        {
            id      : 'smartwalk',
            title   : 'SmartWALK',
            context : 'PMC Technology',
            role    : 'front end application architecture, database design, ' + 
                      'programming, ui/ux.',
            shortDescription : 'Feature-rich web app designed for electrical engineers ' +
            'to map and survey equipment and power systems within buildings',
            description      : 'Feature-rich web app designed for electrical engineers ' +
            'to map and survey equipment and power systems within buildings. ',
            platforms        : ['web']
        },
        {
            id      : 'npm-repos',
            title   : 'Development Tools',
            context : 'NPM',
            role : 'developer/designer',
            shortDescription : 'Wide array of open-source development ' +
                'tools including a React/Redux Project Generator, ' +
                'Node/Express Route Mapper, MySQL Prettifier, and many others',
            description      : '',
            platforms        : ['web'],
            linkDescriptions : [ 'Visit the NPM repos' ]
        },
        {
            id           : 'bamf',
            title        : 'BAMF Web Framework',
            context      : 'Independent/Graduate Thesis',
            role         : 'developer/architect',
            shortDescription : 'A 2D/3D browser framework including a ' +
                'sprite editor which generates source code. Created to conveniently handle ' +
                'complex game logic natively on the web',
            description  : 'The Browser-Based Application Multimedia Framework(or BAMF for short) ' +
                ' was created to address the need for more open-source cohesive web APIs ' +
                'for dealing with multimedia. It supports 2D, 3D(using a Three.js wrapper) and sound.' +
                'It is efficient, simple, consistent, extensible and supports all modern browsers.',
            technologies :  'HTML5, JavaScript (+require.js, three.js), WebGL',
            platforms    :  ['web'],
            platformtxt  : ['Web (Chrome, Firefox, IE)'],
            imageCaptions : [
                'early 3D app tech demo',
                'general API structure overview',
                'easy 2D apps (early prototype)',
                'An anim editor for framework apps'
            ],
            sourceCodeDescriptions : [ 'Github' ],
            linksDescriptions : [ '3D TechDemo(W.I.P.)' ],
            documentation:
            [
                {
                    url  : 'doc/bamf_midterm_presentation.ppt',
                    desc : 'Early Dev (.ppt)'
                },
                {
                    url  : 'doc/bamf_final_presentation.pptx',
                    desc : 'Project Overview(.pptx)'
                }
            ]
        },
        {
            id : 'colorshafted',
            title: 'Color Shafted',
            context      : 'Whateversoft',
            role : 'design, development, music and sound effects creation',
            platforms: ['android', 'gtv'],
            shortDescription : `A colorful interactive futuristic puzzle game with a game 
                    engine built from scratch written using the Android SDK (Java)
                    and currently being ported to Unity/C#`,
            description: 'An interactive original 2D game for Android with a 100% custom built ' +
            'Android 2D Game API. It features a optimized user experience for GoogleTV ' +
            'users, many customizable options, 2 modes of gameplay, an interactive tutorial ' +
            ' and an online competitive high score mode. ',
            technologies: 'Android SDK, Java, XML, JSON, PHP, MySQL',
            platformTxt:  ['Android 2.2 and Higher', 'GoogleTV'],
            imageCaptions: [
                'Title Screen',
                'Setting off a Bomb',
                'High Score Mode',
                'Breaking things down in Tutorial Mode'
            ],
            sourceCodeDescriptions : ['GitHub (early pre-release version)'],
            videos:
            [
                {
                    url: 'https://www.youtube.com/embed/6iOen-STr4k',
                    desc: 'See it on Youtube',
                    embed : true
                }
            ],
            links :
            [
                {
                    desc: 'GTV Friends Article',
                    url: 'http://gtvfriends.com/color-shafted-for-google-tv/'
                }
            ]
        },
        {
            id      : 'sonicphysics',
            title   : 'Sonic 3 Physics',
            context : 'Independent',
            role    : 'programmer, planner & artist',
            shortDescription : 'A pixel perfect rendition of the physics found in SEGA\'s ' +
                               '\"Sonic the Hedgehog\" series. ',
            description      : '',
            screenshots      :
            [
                {
                    url  : '',
                    desc : ''
                }
            ],
            videos:
            [
                {
                    url: 'https://www.youtube.com/embed/zRZOLzTaJq4',
                    desc: 'See it on Youtube',
                    embed : true
                }
            ],
        },
        {
            id      : 'chinesepoker',
            title   : 'Chinese Poker Online',
            context : 'Undergraduate Seminar Project',
            role    : 'programmer and designer',
            shortDescription : 'An interactive and animated rendition of "Big Two" card game for Android. ' +
            'Features real-time online play, intuitive touch screen interface and beautiful graphics',
            description      : '',
            screenshots      :
            [
                {
                    url  : '',
                    desc : ''
                }
            ],
            videos:
            [
                {
                    url: 'https://www.youtube.com/embed/F91K9oWimSg',
                    desc: 'See it on Youtube',
                    embed : true
                }
            ],
        }
    ],
}