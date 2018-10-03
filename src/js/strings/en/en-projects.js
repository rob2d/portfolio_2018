import React from 'react'

export default {
    moreInfo : 'More Info',
    projectData :
    [
        {
            id      : 'buildandwatch',
            title   : 'Build & Watch',
            context : 'Independent',
            roles   : 'Maintainer, Designer and Developer',
            shortDescription : 'A simple retro-Gameboy ROM development workflow tool built using NodeJS',
            description : [
                
                'This project started from a bet between a co-worker among several of us that nobody was capable of creating a Gameboy ' + 
                'ROM within a few days outside of work. It seemed like a great opportunity to get back in touch with certain aspects ' + 
                'of computer science that I don\'t normally work with, so I jumped in! ',
                
                (<span>Along the way, we crowdsourced a lot of low-level information which was pretty tough to find. 
                A talented friend and coworker of mine, <a href={'http://www.gmiller.net'} target="_new">Greg Miller</a>, ended up winning
                that bet. I was preoccupied with re-learning C at the time to worry about building games, and ended up so 
                fascinated by the technology/process (and noticing how painful it was for him), that I created this tool. Using his colorful 
                feedback as he built a large scale game, I improved upon this build system over a few weekends and it became a little bit 
                of a side hobby between us. </span>),

                'This sort of code-ified and automated what we had learned/painfully figured out so that we did not have to mess ' + 
                'with very ancient build configurations anymore and could simply mess around with retro development and instantly spin up ' +
                'prototype projects. It was also just a fun and practical way to dive deep into low level C and let me ' + 
                'experiment with some ideas in NodeJS in regards to process management and libraries that synergistically ' + 
                'became extremely useful for my primary work at the time.'
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
            shortDescription : 'Simple workflow template to get a jumpstart on React/Redux applications.',
            description : [
                'A simple workflow template for React/Redux applications ' + 
                'which features live reloading, JSS, cache-busting, optimization/compression, instantaneous ' + 
                'and flexible production-level deployment and a few other neat things or what you would otherwise ' + 
                'expect in your web build systems. ' + 
                'Well documented and simple installation, and then you\'re good to go. No need to fiddle with webpack ' + 
                'or other technologies when you have little time -- it just relies on Gulp and Babel and the ' + 
                'code is all very transparent and simple to read/modify (caveat: I have recently massively refactored the build ' + 
                'code on recent projects such as this portfolio and this is not quite yet in the repo 😅). ',

                'I developed this as a need to scratch my own itch as it is always a hassle to keep all of your ' + 
                'installation parts up to date for React/Redux apps. I also tend to have used Gulp a lot for other ' + 
                'deployment processes (such as minimal packaging for quick AWS serverless deployment, processing files, etc.), ' + 
                'so it has been convenient on small teams when we didn\'t quite have the resources to spin up a full deployment ' + 
                'system from scratch (CRA and other alternatives I\'ve found have not provided too much in terms of production ' + 
                'ready tools).',
                
                (<span>I have deployed 8 front-end projects since late 2016 with it. It was used to create a decent starting point for 
                several very high profile projects that I am aware of, such as <a href={'/projects/smartwalk'}>an engineering app</a> to support most of the Fortune 500 
                company-housed skyscrapers in NYC today as well as the official newspaper for a top highschool in the US 
                (<a href={'http://www.stuyspec.com'} target='_new'>http://www.stuyspec.com</a>). It was also used to spin up much less 
                high profile/ground-shaking projects -- such as this portfolio!</span>)
            ],
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

                'When first working on this project in 2014, the company was fully bootstrapped and had two software ' + 
                'developers (myself included) and a third person who was familiar with the business who also doubled as dev-ops. ' + 
                'We took it upon ourselves to set an agreed upon standard for UI, development process, scrum, etc. ', 
                'My primary responsibility was initially to create the database (which I modeled many concepts from a grad ' + 
                'course found in the universal health care centralized database), and researched technologies and independently ' + 
                'created a Node server as well as a highly interactive CMS for arranging building layouts which communicated with an ' +
                'Android app. This first application was built with NodeJS on the backend and YUI3 on the frontend and ' +
                ' somehow still running and servicable today in JFK airport (uses intranet and has a different license agreement).', 

                'A second iteration of the application was created to meet the demands of hightened security for new clients ' + 
                'such as the New York Stock Exchange and Chase Bank as well as cloud based centralization of the API. I shifted my focus ' + 
                'to the front-end and became proficient in React and Flux to meed the needs of the new app. ' + 
                'By the time I left PMC in 2017, we had expanded to 6 developers, of which one I was mentoring, a project ' +
                'manager above us, and a small QA team. This application is still being used and expanded upon today.',

                (<i>Sidenote: In some screens on the top right, there are a ton of UI Icons instead of an intuitive menu.  
                This was extremely temporary as we were working on a major new client deal and as a UI/UX designer can concede 
                definitely hideous (PMC was nice enough to let me post this and it would be unethical to include something I was 
                not involved in afterwards).</i>)
            ],
            linkDescriptions : [ 
                'Marketing Website', 'Client Login to the CMS' 
            ],
            mediaCaptions: [
                'Intuitive media management and photo uploading for items',
                'Graphing out for multiple points of data in a scalable system',
                'Convenient User Account System with security features',
                'Internal document management within CMS for convenience and security',
                'Intuitive and interactive widgets for each part of the process'
            ]},
            {
                id      : 'npm_repos',
                title   : 'NPM Dev Tools',
                context : 'NPM',
                roles   : 'Development and Design',
                shortDescription : 'Wide array of open-source development tools',
                description      : [
                    'Along the way of developing software professionally, ' + 
                    'there are several times where it has been advantageous to open-source some small ' +
                    'tools along the way which I also use for personal projects. The NPM repos are just a ' +
                    'quick collection of some packages which are downloaded up to hundreds of times daily ' +
                    'by other developers. They range in quality and completeness but in these cases it was better to ' + 
                    'open source or provide via a public resource than to house things internally. In most cases, it was simply ' + 
                    'because I was exploring an idea on my own time that ended up useful at work (or maybe didn\'t except to someone ' + 
                    'on the internet 🙂)'
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
                    'sprite editor which generates source code.',
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
                        `An interactive and futuristic puzzle game with the engine ` + 
                        `built from scratch written using the Android SDK`,
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
                    'was started in Unity/C# and has significant work done which I would love to add here sometime ' + 
                    'when I have time outside of work to.'
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
                '2005 Promo (provided direction / animation help but most grunt work on this video was done by a talented friend ' + 
                'named Cinos)',
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
            shortDescription : 'An interactive rendition of "Big Two" card game for Android featuring realtime online gameplay',
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