import MediaTypes from 'constants/MediaTypes'

// simple function to quickly generate
// new rows of images
function generateMediaImages(projectId, mediaCount) {
    let mediaImages = [];

    for(let i = 0; i < mediaCount; i++) {
        mediaImages.push({
            type  : MediaTypes.IMAGE,
            src   : `/img/projects/${projectId}/${projectId}_screen_0${i+1}.png`,
            thumb : `/img/projects/${projectId}/${projectId}_thumb_0${i+1}.png`,
        });
    }

    return mediaImages;
}

export default { 
    'thanos_slack_files' : {
        year : '2019',
        links : ['https://www.npmjs.com/package/thanos-slack-files'],
        sourceCode : ['https://github.com/rob2d/thanos_slack_files'],
        mediaAspectRatio : 1.36,
        media : [
            // N/A
        ]
    },
    'buildandwatch' : {
        year : '2018',
        links      : [
            'https://www.npmjs.com/package/build-and-watch',
            'http://www.gmiller.net/2018/07/gameboy-color-fix-it-felix-jr',
        ],
        sourceCode : ['https://github.com/rob2d/build-and-watch#readme'],
        mediaAspectRatio : 1.36,
        media : [
            ...generateMediaImages('buildandwatch', 1),
            {
                type    : MediaTypes.VIDEO,
                videoId : 'FrXLMEPN4ew'
            },
            {
                type    : MediaTypes.VIDEO,
                videoId : 'f58abL3nUgM'    
            }
        ],
    },
    'greedux' : {
        year  : '2017-2018',
        links : ['https://www.npmjs.com/package/generator-greedux'],
        sourceCode : ['https://github.com/rob2d/greedux/'],
        media : [
            ...generateMediaImages('greedux', 1)
        ]
    },
    'smartwalk' : {
        year : '2014 - 2017',
        media : generateMediaImages('smartwalk', 5),
        mediaAspectRatio : 1.79,
        links : [ 
            'https://smartwalk.tech/',
            'https://app.smartwalk.tech/'
        ]
    },
    'npm_repos' : {
        year : '2014 - 2017',
        links : [ 'https://www.npmjs.com/~robftw' ]
    },
    'chinesepoker' : {
        year : '2011',
        media : [
            {
                type : MediaTypes.VIDEO,
                videoId   : 'F91K9oWimSg'
            }, 
            ...generateMediaImages('chinesepoker', 4)
        ],
        mediaAspectRatio : 1.662337662337662,
        sourceCode : ['https://github.com/rob2d/cpo_android']
    },
    'sonicphysics' : {
        year : '2005, 2009',
        media : [
            {
                type : MediaTypes.VIDEO,
                videoId : 'zRZOLzTaJq4'    
            },
            {
                type   : MediaTypes.VIDEO,
                videoId : 'HWJy0uLVfjU'
            },
            ...generateMediaImages('sonicphysics', 4) 
        ],
        mediaAspectRatio : 1.203,
        sourceCode :    [ 'https://github.com/rob2d/sonic_gml' ],
        downloads  :    [ 'http://robftwcom.appspot.com/downloads/sonic360_demo.exe' ],
        documentation : [ 'http://corruptedchaos.blogspot.com/' ]
    },
    'colorshafted' : {
        year : '2012',
        media : [
            {
                type  : MediaTypes.VIDEO,
                videoId    : '6iOen-STr4k'
            },
            ...generateMediaImages('colorshafted',5)
        ],
        mediaAspectRatio : 1.662337662337662,
        sourceCode : ['https://github.com/rob2d/color-shafted'],
        links : [
            'http://web.archive.org/web/20120817025020/http://gtvfriends.com:80/color-shafted-for-google-tv/',
            'http://robftwcom.appspot.com/links/cs_web_preview/webview/achievements.html'
        ]
    },
    'bamf' : { 
        year : '2012',
        media : [...generateMediaImages('bamf', 4)],
        mediaAspectRatio : 1.7777,
        sourceCode : [ 'https://github.com/rob2d/bamf' ],
        documentation : [ 
            'http://robftwcom.appspot.com/doc/bamf_midterm_presentation.ppt', 
            'http://robftwcom.appspot.com/doc/bamf_final_presentation.pptx' 
        ],
        links : [ 
            'http://whateversoftweb.appspot.com/demo/cs3d/web/cs3d.html',
            'http://bamfapi.appspot.com/wip_versions/v2/editor/web/sprite_editor.html'
         ] 
    }
};