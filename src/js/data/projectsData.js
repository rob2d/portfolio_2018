import MediaTypes from 'constants/MediaTypes'

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
    'npm-repos' : {
        links : [ 'https://www.npmjs.com/~robftw' ]
    },
    'chinesepoker' : {
        media : [],
        videos : [{
            src   : 'https://www.youtube.com/embed/F91K9oWimSg',
            embed : true
        }]
    },
    'sonicphysics' : {
        media : generateMediaImages('sonicphysics', 4),
        mediaAspectRatio : 1.203
    },
    'colorshafted' : {
        media : [
            {
                type  : MediaTypes.VIDEO,
                src   : 'https://www.youtube.com/embed/6iOen-STr4k',
                embed : true
            },
            ...generateMediaImages('colorshafted',4)
        ],
        mediaAspectRatio : 1.662337662337662,
        videos : [{
            src   : 'https://www.youtube.com/embed/6iOen-STr4k',
            embed : true
        }],
        links : [{
            url :  'http://gtvfriends.com/color-shafted-for-google-tv/'
        }]
    },
    'bamf' : { 
        media : [...generateMediaImages('bamf', 4)],
        mediaAspectRatio : 1.7777,
        sourceCode : [ 'https://github.com/rob2d/bamf' ],
        documentation : [ 
            'doc/bamf_midterm_presentation.ppt', 
            'doc/bamf_final_presentation.pptx' 
        ],
        links : [ 'http://whateversoftweb.appspot.com/demo/cs3d/web/cs3d.html' ] 
    }
};