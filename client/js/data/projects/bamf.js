import generateMediaImages from './data-helpers/generateMediaImages';

export default {
    id: 'bamf',
    displayName: 'BAMF Web Framework',
    year: '2012',
    context: 'Graduate Thesis',
    roles: 'Design, Development & Planning',
    technologies: ['html','js','threejs','yui3'],
    platforms: ['web'],
    platformTxt: ['Web (Chrome, Firefox, IE)'],
    shortDescription: 'A 2D/3D browser framework including a ' +
            'sprite editor which generates source code.',
    description: [
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
    media: {
        aspectRatio: 1.7777,
        items: [...generateMediaImages('bamf', 4, [
            'early 3D app tech demo',
            'general API structure overview',
            'easy 2D apps (early prototype)',
            'An anim editor for framework apps'
        ])]
    },
    sourceCode: [
        {
            url: 'https://github.com/rob2d/bamf',
            description: 'Github'
        }
    ],
    documentation: [
        {
            url: 'http://robftwcom.appspot.com/doc/bamf_midterm_presentation.ppt',
            description: 'Early Development (.ppt)',
        },
        {
            url: 'http://robftwcom.appspot.com/doc/bamf_final_presentation.pptx',
            description: 'Project Overview (.ppt)'
        }
    ],
    links: [
        {
            url: 'http://whateversoftweb.appspot.com/demo/cs3d/web/cs3d.html',
            description: '3D Tech Demo Prototype'
        },
        {
            url: 'http://bamfapi.appspot.com/wip_versions/v2/editor/web/sprite_editor.html',
            description: 'Basic Sprite Editor written in YUI'
        }
    ]
};
