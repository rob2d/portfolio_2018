/**
 * TODO : use MongoDB instead of shoving crap in here
 * TODO | (works for now though)
 *
 * TODO : SHORT DESCRIPTIONS -> for the projects overview
 */

export default
{
    projects :
    [
        {
            id           : 'bamf',
            title        : 'B.A.M.F. Web Framework-ido. This is Spanish',
            context      : 'Independent/Graduate Thesis',
            shortDescription : 'An interactive 2D/3D multimedia framework including an API and' +
            'sprite editor which generates source code to make it easier to ' +
            'synchronously handle complex logic natively on the web',
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
                    desc: 'easy 2D apps' +
                    '(early prototype)'
                },
                {
                    url: 'img/projects/screens/bamf/bamf_04.png',
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
        id           : 'colorshafted',
        title        : 'Color Shafted!',
        context      : 'Whateversoft',
        platforms    : ['android', 'gtv'],
        stores:
        {
            gplay:       'https://play.google.com/store/apps/details?id=com.whateversoft.colorshafted&feature=search_result#?t=W251bGwsMSwxLDEsImNvbS53aGF0ZXZlcnNvZnQuY29sb3JzaGFmdGVkIl0.',
            amazon:      'http://www.amazon.com/Whateversoft-Color-Shafted/dp/B00B72CEWC/ref=sr_1_1?ie=UTF8&qid=1392872956&sr=8-1&keywords=Color+Shafted'},
            description: 'An interactive original 2D game for Android with a 100% custom built ' +
                        'Android 2D Game API. It features a optimized user experience for GoogleTV ' +
                        'users, many customizable options, 2 modes of gameplay, an interactive tutorial ' +
                         ' and an online competitive high score mode. ',
            technologies: 'Android SDK, Java, XML, JSON, PHP, MySQL',
            platformtxt:  ['Android 2.2 and Higher', 'GoogleTV'],
            screenshots: [
            {
                url: 'img/projects/screens/colorshafted/colorshafted_01.jpg',
                desc: 'Title Screen'},
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
        shortDescription : `A colorful interactive futuristic puzzle game with a game 
                            engine built from scratch written using the Android SDK (Java)
                            and currently being ported to Unity/C#`,
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
        ]}
    ]
}