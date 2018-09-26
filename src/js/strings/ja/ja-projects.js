/**
 * TODO | use DB instead of shoving crap in here
 * TODO | (works for now though)
 */

export default
{
    moreInfo : '詳細', // shousai - rough translation: "details"
    projectData :
    [
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
                id      : 'npm-repos',
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
            context      : '自主制作 (卒業論文)',
            shortDescription : 'APIとスプライトエディタを含むインタラクティブな2D / 3Dマルチメディアフレームワークで、' +
            'ソースコードを生成してウェブ上で複雑なロジックをネイティブに簡単に同期処理すること' +
            'を容易にします',
            description  : 'The Browser-Based Application Multimedia Framework(or BAMF for short) ' +
            ' was created to address the need for more open-source cohesive web APIs ' +
            'for dealing with multimedia. It supports 2D, 3D(using a Three.js wrapper) and sound.' +
            'It is efficient, simple, consistent, extensible and supports all modern browsers.',
            technologies :  'HTML5, JavaScript (+require.js, three.js), WebGL',
            platforms    :  ['web'],
            platformtxt  : ['Web (Chrome, Firefox, IE)'],
            thumbnail : 'img/projects/bamf_thumb.png',
            screenshots:
            [
                {
                    url: 'img/projects/screens/bamf/bamf_01.png',
                    desc: 'early 3D app tech demo'
                },
                { 	url: 'img/projects/screens/bamf/bamf_02.png',
                    desc: 'general API structure overview'
                },
                { 	url: 'img/projects/screens/bamf/bamf_03.png',
                    desc: 'easy 2D apps (early prototype)'
                },
                {
                    url : 'img/projects/screens/bamf/bamf_04.png',
                    desc: 'An anim editor for framework apps'
                }
            ],
            source:
            [
                {
                    url:'https://github.com/rob2d/bamf',
                    desc:'GitHub'
                }
            ],
            links:
            [
                {
                    url  : 'http://whateversoftweb.appspot.com/demo/cs3d/web/cs3d.html',
                    desc : '3D TechDemo(W.I.P.)'
                }
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
            id : 'colorshafted',
            title: 'Color Shafted',
            context      : 'Whateversoft (自主制作)',
            platforms: ['android', 'gtv'],
            stores:
            {
                gplay:       'https://play.google.com/store/apps/details?id=com.whateversoft.colorshafted&feature=search_result#?t=W251bGwsMSwxLDEsImNvbS53aGF0ZXZlcnNvZnQuY29sb3JzaGFmdGVkIl0.',
                amazon:      'http://www.amazon.com/Whateversoft-Color-Shafted/dp/B00B72CEWC/ref=sr_1_1?ie=UTF8&qid=1392872956&sr=8-1&keywords=Color+Shafted'
            },
            shortDescription : `Android SDK（Java）を使用して作成され、現在ユニティ/ C＃
                                に移植されている最初から構築されたゲームエンジンを備えたカラフルな
                                インタラクティブな未来的なパズルゲーム。`,
            description: 'An interactive original 2D game for Android with a 100% custom built ' +
            'Android 2D Game API. It features a optimized user experience for GoogleTV ' +
            'users, many customizable options, 2 modes of gameplay, an interactive tutorial ' +
            ' and an online competitive high score mode. ',
            technologies: 'Android SDK, Java, XML, JSON, PHP, MySQL',
            platformtxt:  ['Android 2.2 and Higher', 'GoogleTV'],
            screenshots: [
                {
                    url: 'img/projects/screens/colorshafted/colorshafted_01.jpg',
                    desc: 'Title Screen'
                },
                {
                    url: 'img/projects/screens/colorshafted/colorshafted_02.jpg',
                    desc: 'Setting off a Bomb'
                },
                {
                    url: 'img/projects/screens/colorshafted/colorshafted_03.jpg',
                    desc: 'High Score Mode'
                },
                {
                    url: 'img/projects/screens/colorshafted/colorshafted_04.jpg',
                    desc: 'Breaking things down in Tutorial Mode'
                }
            ],
            source:
            [
                {
                    'desc': 'GitHub (earlier release)',
                    'url': 'https://github.com/rob2d/color-shafted/tree/master/src/com/whateversoft'
                }
            ],
            videos:
            [
                {
                    url: 'http://www.youtube.com/watch?v=6iOen-STr4k',
                    desc: 'See it on Youtube'
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
            shortDescription : 'セガのソニック・ザ・ヘッジホッグシリーズで' +
                               'キャプチャーしたキャラクターの' +
                               '動きのピクセルパーフェクト・レンディション',
            description      : '',
            screenshots      :
            [
                {
                    url  : '',
                    desc : ''
                }
            ]
        },
        {
            id      : 'chinesepoker',
            title   : 'Chinese Poker Online',
            context : 'Undergraduate Seminar Project',
            shortDescription : 'An interactive and animated rendition of "Big Two" card game for Android. ' +
            'Features real-time online play, intuitive touch screen interface and beautiful graphics',
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
            screenshots : [{
                    url  : '',
                    desc : ''
                }
            ]
        }
    ]
}