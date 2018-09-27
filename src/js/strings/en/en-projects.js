/**
 * TODO  use MongoDB instead of shoving crap in here
 * TODO  (works for the small amount of content for now 
 * TODO   though)
 *
 * TODO : SHORT DESCRIPTIONS -> for the projects overview
 */

export default
{
    moreInfo : 'More Info',
    projectData :
    [
        {
            id      : 'buildandwatch',
            title   : 'Build & Watch',
            context : 'Independent',
            roles   : 'Maintainer, Designer and Developer',
            shortDescription : 'A simple retro-Gameboy ROM development workflow tool built using NodeJS: auto-compiles your ' +
                               'ROMs and live-reloads an emulator of your choice.',
            description : [
                'A simple retro-Gameboy ROM development workflow tool built using NodeJS: auto-compiles your ' +
                'ROMs and live-reloads an emulator of your choice. ',
                'This project started from a bet between a co-worker among several of us that nobody could not create a Gameboy ' + 
                'ROM within a few days outside of work.It seemed like a great opportunity to get back in touch with certain aspects ' + 
                'of computer science that I don\'t normally work with so I jumped in. Along the way we, ' + 
                'crowdsourced a lot of information which was pretty tough to find with building Gameboy ROMs along with very ' + 
                'specific hardware info in a slack channel. ',
                'A talented friend and coworker of mine, Greg Miller(http://www.gmiller.net), ended up winning that bet, and I ' + 
                'ended up so fascinated by the technology/process, and noticing how painful it was for him to build that, I created this tool. ' + 
                'Using his colorful feedback as he built a larger scale game, I improved upon it over a few weekends and it became a little ' + 
                'bit of a side hobby between us. This sort of code-ified what we had learned/painfully figured out about build ' + 
                'processes so that we did not have to mess with very ancient build configurations anymore and could simply mess around ' + 
                'with retro development (in the rare case where we\'d have time, at least). It also let me experiment with some ideas ' + 
                'in NodeJS that sort of synergistically worked with and became extremely useful for my primary work.'
            ],
            linkDescriptions : [ 'NPM Repo', 'Wreck it Ralph Remake Project (@Greg\'s Site)' ],
            mediaCaptions: [
                'ROM Build running on a real Gameboy Color',
                'Greg\'s Project Progress Video'
            ],
            sourceCodeDescriptions : [ 'Github' ] 
        },
        {
            id      : 'greedux',
            title   : 'Greedux',
            context : 'Independent',
            roles   : 'Maintainer, Designer and Developer',
            shortDescription : 'A modular, clean and scalable modern workflow template for React/Redux development.',
            description : ['A modular, clean and scalable modern workflow template for React/Redux development ' + 
                'which features Live Reloading, JSS, instantaneous and flexible production-level deployment and a few other neat things. ' + 
                'Well documented and simple installation, and then you\'re good to go. No need to fiddle with webpack ' + 
                'or other technologies which keep your team at the mercy of dependency hell as it just relies on Gulp and Babel. ',
                'I developed this sort of as a need to scratch my own itch as it is always a hassle to keep all of your ' + 
                'installation parts up to date for React/redux apps. I have deployed well over 10 front-end projects since 2017 with it and it ' + 
                'is now being used to launch several very high profile projects such as an engineering app to support most of the Fortune 500 company-' +
                'housed skyscrapers in NYC today as well as the official newspaper for a top highschool in the US (http://www.stuyspec.com).'],
            linkDescriptions : [ 'NPM Repo' ],
            sourceCodeDescriptions : [ 'Github' ] 
        },
        {
            id      : 'smartwalk',
            title   : 'SmartWALK',
            context : 'PMC Technology',
            roles    : 'Senior Web Application Developer & UI/UX Designer',
            shortDescription : 'Feature-rich web app designed for electrical engineers ' +
                                'to map and survey equipment and power systems within buildings',
            description      : [
                'SmartWALK is an application designed to provide assistance for electrical ' +
                'engineers who survey large skyscrapers and other facilities. Essentially, it allows them to track ' + 
                'equipment, personnel, shifts and information about whether or not work was performed as well as ' +
                'metrics which are critical to detect whether a power system or other electronics may malfunction.',
            
                'Because of the critical role of this application in several key pieces of infrastructure such as the ' +
                'Empire State Building, JFK Airport and the new World Trade Center, a high emphasis was placed on ' +
                'security and reliability.',

                'When first working on this project in 2014, the company only had two software developers (myself included), ' + 
                'no backend, and throughout there were no UI designers. I had taken it upon myself to begin work on a ' +
                'database (which I modeled with concepts from a grad course found in the universal health care centralized database), ' +
                'and researched to create a Node server as well as took the initiative to create a highly interactive ' +
                'CMS for arranging building layouts which communicated with an Android backend. This first application, ' +
                'built with NodeJS on the front end and YUI3 on the backend is somehow still running and ' +
                'servicable today.', 

                'A second iteration of the application was created to meet the demands of hightened security for new clients ' + 
                'such as the New York Stock Exchange and Chase Bank; so I shifted my focus to the front-end and became proficient in ' +
                'React and Flux. By the time I left PMC in 2017, we had expanded to 5 developers, of which one I was mentoring, and a small QA team ' +
                'and this application is still being used today.'
                ],
                linkDescriptions : [ 'Marketing Website', 'Client Login to the CMS' ],
                mediaCaptions: [
                    'Intuitive media management and photo uploading for items',
                    'Graphing out for multiple points of data in a scalable system',
                    'Convenient User Account System with security features',
                    'Internal document management within CMS for convenience and security',
                    'Intuitive and interactive widgets for each part of the process'
                ],
            },
            {
                id      : 'npm_repos',
                title   : 'Development Tools',
                context : 'NPM',
                roles : 'Development and Design',
                shortDescription : 'Wide array of open-source development ' +
                    'tools  including a Node/Express Route Mapper, MySQL ' + 
                    'Prettifier, and many others',
                description      : [
                    'Along the way of developing software professionally, ' + 
                    'there are several times where it has been advantageous to open-source some small ' +
                    'tools along the way which I also use for personal projects. The NPM repos are just a ' +
                    'quick collection of some packages which are downloaded up to hundreds of times daily ' +
                    'by other developers.',
                    'Many of these were created when I had first started developing in NodeJS but there are ' +
                    'some specific projects which probably deserve their own section such as a React-Redux application ' +
                    'generator which contains all of the benefits of gulp and creates fully production-ready versions ' +
                    'of applications in seconds (this portfolio is an example).'
                ],
                platforms        : [ 'web' ],
                linkDescriptions : [ 'Visit the NPM repos' ]
            },
            {
                id           : 'bamf',
                title        : 'BAMF Web Framework',
                context      : 'Graduate Thesis',
                roles        : 'Design, Development & Planning',
                shortDescription : 'A 2D/3D browser framework including a ' +
                    'sprite editor which generates source code. Created to conveniently handle ' +
                    'complex game logic natively on the web.',
                description  : [
                    'The Browser-Based Application Multimedia Framework (or BAMF for short) ' +
                    ' was created to address the need for more open-source cohesive web APIs ' +
                    'for dealing with multimedia. It was mainly an excuse for me to jump from ' +
                    'native application development to web development in graduate school as I ' + 
                    'already had a working Game API in Android and thought it would be great to ' +
                    'port this to the web as at the time it was created, the HTML5 API and JavaScript ' +
                    'were only beginning to become standardized. ',
                    'It supports 2D, 3D (using a Three.js wrapper) and sound, ' +
                    'and has a really convenient 2D sprite generator that even creates source code for you. ' +
                    'It is efficient, simple, consistent, extensible and supports all modern browsers.'
                ],
                technologies :  'HTML5, JavaScript (+require.js, three.js), WebGL',
                platforms    :  ['web'],
                platformtxt  : [ 'Web (Chrome, Firefox, IE)' ],
                mediaCaptions : [
                    'early 3D app tech demo',
                    'general API structure overview',
                    'easy 2D apps (early prototype)',
                    'An anim editor for framework apps'
                ],
                documentationDescriptions : [
                    'Early Development (.ppt)',
                    'Project Overview (.ppt)'
                ],
                sourceCodeDescriptions : [ 'Github' ],
                linkDescriptions : [ 
                    '3D Tech Demo Prototype',
                    'Basic Sprite Editor written in YUI' 
                ],
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
                id      : 'colorshafted',
                title   : 'Color Shafted',
                context : 'Whateversoft',
                roles   : 'Design, Development, Music and Sound Effects Creation',
                platforms: [ 'android', 'gtv' ],
                shortDescription : 
                        `An interactive and futuristic puzzle game with a game 
                        engine built from scratch written using the Android SDK
                        and currently being ported to Unity/C#`,
                description: 
                [
                    'An interactive original 2D game for Android with a 100% custom built ' +
                    'Android 2D Game API. It features a optimized user experience for GoogleTV ' +
                    'users, many customizable options, 2 modes of gameplay, an interactive tutorial ' +
                    ' and an online competitive high score mode. ',
                    'This project was created as a final project for an undergraduate Computer Graphics class and ' +
                    'essentially made to capitalize and dive deeper into the Game API ' +
                    'I had developed for an undergraduate seminar project earlier. It also was a good excuse ' +
                    'to have fun doing other tasks with my time outside of college classes such as learning to ' +
                    'create music and sound effects in FLStudio.',
                    'Unfortunately, as this project was not created for profit and there was one developer, ' +
                    'it is not currently playable in the current Android OS as it has not properly been maintained ' +
                    '(mainly because my focus has been on web development for the past 5 years). A port has been ' +
                    'started this year (in 2017) in Unity/C# for commercial purposes and has significant work done ' +
                    'which I would love to add here soon though.'
                ],
                technologies: 'Android SDK, Java, XML, JSON, PHP, MySQL',
                platformTxt:  ['Android 2.2 and Higher', 'GoogleTV'],
                mediaCaptions: [
                    'Promotional YouTube Video',
                    'Title Screen',
                    'Setting off a Bomb',
                    'High Score Mode',
                    'Breaking things down in Tutorial Mode',
                    'Achievements'
                ],
                sourceCodeDescriptions : [ 'GitHub (early pre-release version)' ],
                linkDescriptions : [ 
                    'GTV Friends Article (Archived @ WayBackMachine)',
                    'Achievements Beta Version with mock data for WebView' 
                ]
            },
            {
                id      : 'sonicphysics',
                title   : 'Sonic 3 Physics',
                context : 'Independent',
                roles    : 'Programming, Planning and Artwork',
                shortDescription : `A pixel perfect rendition of the physics found in SEGA's
                                "Sonic the Hedgehog" series. `,
                description      : [
                    'This physics engine was actually part of a game I was ' +
                    'developing called "Sonic: Corrupted Chaos" and was developed using a scripting language ' + 
                    'similar to JavaScript called GML. That game never came to fruition -- so I ' +
                    'released this as an open source to an online community which I participated in as a ' +
                    'teenager and it spun off into many independent games. It is a perfect representation of ' +
                    'Yuji Naka\'s original "Sonic the Hedgehog" series for Sega Genesis\' physics.',
                    'It started off as simply a way for me to practice coding after a hiatus from my ' +
                    'eternal hobby after some time in the military, before I could start on my CSCI core courses. ' +
                    'At the time, I had developed tendonitis in my elbows from a physically intensive job and got the ' +
                    'itch to code while I couldn\'t get back to work. ',
                    'Had I known there was a market, this could have been Sonic Mania years ago. ' +
                    '"Should\'ve would\'ve, ' + 
                    'could\'ve", as they say. At the end of the day, it served its purpose as a good warm-up for ' +
                    'coding again 🙂'
            ],
            mediaCaptions : [
                'Play-test video',
                'Pushing against spikes underwater',
                'Speed!',
                'Customizing Controller config',
                'Swimming as tails'
            ],
            sourceCodeDescriptions : [
                'Souce Code (GML) @ Github'
            ],
            downloadDescriptions : [
                'Demo (Windows OS)'
            ],
            documentationDescriptions : [ 'Blogger' ]
        },
        {
            id       : 'chinesepoker',
            title    : 'Chinese Poker Online',
            context  : 'Undergraduate Seminar',
            roles    : 'Programming, Planning & Design',
            shortDescription : 'An interactive and animated rendition of "Big Two" card game for Android. ' +
            'Real-time online play, intuitive touch screen interface and custom graphics.',
            description : [
                'Chinese Poker Online was a game which during the years it was released (2011) had very ' +
                'bright colorful graphics and online play on a mobile platform which was rare for a card game. It was' +
                'based on a game called "Big Two" which I often played in highschool at lunch',
                'Although not my first application by a long shot, Chinese Poker Online was my first ' +
                'truly large-scale application created in a professional programming language. Prior to it, ' +
                'I had dabbled quite a lot in C and JavaScript but had not ever completed a large project with any of them. ',
                'Chinese Poker Online was a very ambitious first-scalable project as it leveraged a custom game API I had been ' +
                'building outside of my Programming 2 and Data Structures class.'
            ],
            mediaCaptions : [
                'Undergraduate seminar project demo intro',
                'Title Screen',
                'Welcome Menu',
                'Start of a new game',
                'Managing a hand for a play'
            ],
            sourceCodeDescriptions : ['Github']
        }
    ]
}