import generateMediaImages from './data-helpers/generateMediaImages';

export default {
    id : 'colorshafted',
    displayName : 'Color Shafted',
    context : 'Whateversoft',
    year : '2012',
    roles   : 'Design, Development, Music and SFX Creation',
    technologies : ['android_sdk', 'java', 'js', 'jquery', 'php'],
    media : {
        aspectRatio : 1.662337662337662,
        items : [
            {
                type : 'video',
                videoId : '6iOen-STr4k',
                caption : 'Promotional YouTube Video'
            },
            ...generateMediaImages('colorshafted',5, [
                'Title Screen',
                'Setting off a Bomb',
                'High Score Mode',
                'Breaking things down in Tutorial Mode',
                'Achievements'
            ])
        ]
    },
    platforms : ['android', 'gtv'],
    shortDescription : (
        `An interactive and futuristic puzzle game with the engine ` +
        `built from scratch written using the Android SDK`
    ),
    description :
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
    platformTxt:  ['Android 2.2 and Higher', 'GoogleTV'],
    links : [
        {
            url : 'http://web.archive.org/web/20120817025020/http://gtvfriends.com:80/color-shafted-for-google-tv/',
            description : 'GTV Friends Article (Archived @ WayBackMachine)'
        },
        {
            url : 'http://robftwcom.appspot.com/links/cs_web_preview/webview/achievements.html',
            description : 'Achievements Beta Version with mock data for WebView'
        }
    ],
    sourceCode : [{
        url : 'https://github.com/rob2d/color-shafted',
        description : 'GitHub (early pre-release version)'
    }]
};
