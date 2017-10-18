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
            id      : 'smartwalk',
            title   : 'SmartWALK',
            context : 'PMC Technology',
            shortDescription : `電気技術者が建物内の機器と電力システムをマップして調査するための、
                                豊富な機能を備えたウェブアプリ`,
            description      : '',
            thumbnail        : 'img/projects/bamf_thumb.png',
            screenshots      :
            [
                {
                    url  : '',
                    desc : ''
                }
            ]
        },
        {
            id      : 'npm-repos',
            title   : 'Development Tools',
            context : 'NPM',
            shortDescription : 'Wide array of open-source development ' +
            'tools including a React/Redux Project Generator, ' +
            'Node/Express Route Mapper, MySQL Prettifier, and others; ' +
            'created to help build larger projects',
            description      : '',
            thumbnail        : 'img/projects/bamf_thumb.png',
            screenshots      :
            [
                {
                    url  : '',
                    desc : ''
                }
            ]
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
            shortDescription : 'A pixel perfect rendition of the physics found in SEGA\'s ' +
            '\"Sonic the Hedgehog\" series. ',
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
            description      : '',
            screenshots      :
            [
                {
                    url  : '',
                    desc : ''
                }
            ]
        }
    ]
}