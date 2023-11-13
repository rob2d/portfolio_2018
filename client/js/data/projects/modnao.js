export default {
    id: 'modnao',
    displayName: 'ModNao',
    year: '2023',
    context: 'Independent',
    roles: 'Designer, Developer',
    technologies: ['ts', 'react', 'redux', 'jest'],
    shortDescription: 'Intuitive 3D model browser and texture editor for a targeted set of Dreamcast games',
    description: [
        'Intuitive graphical editor with no technical knowledge necessary for those interested in making edits directly to Dreamcast ROM files; written in React, Redux, Three.js/React Three Fiber, Next.js. ',
        'Using their browser, a user directly select a game\'s raw files, and are presented interactive 3D models and texturesthat they can navigate using a GUI and control a scene and edit textures or pinpoint exactly what they\'re selecting in realtime.',
        'This was a great learning opportunity for me to learn about 3D rendering, image formats, data-compression, and I even found a reason to use a machine-learning based k-means clustering algorithm for assembling vector-image quantized data for some of ' +
        'the export functionality to optimize images better than the original game\'s compression.',
        'It has been used extensively for most in-person game events for Marvel vs Capcom 2 used by several communities organically for branding and has been picked up by various users without an explicit tutorial -- in large part due to ease-of-use and streamlined UX.',
    ],
    media: {
        aspectRatio: 1492/1010,
        items: [{
            type: 'image',
            src: `/img/projects/modnao/selecting-polys-and-color-shift-cropped.gif`,
            thumb: `/img/projects/modnao/selecting-polys-and-color-shift-cropped.gif`,
            caption: 'Selecting polygons to view associated textures mapped and applying color operations to update them on a scene in realtime'
        },
        {
            type: 'image',
            src: `/img/projects/modnao/dnd-for-texture-replace-dialog.gif`,
            thumb: `/img/projects/modnao/dnd-for-texture-replace-dialog.gif`,
            caption: 'Drag n drop in dedicated texture view to see an interactive texture editor to replace textures'
        }]
    },
    sourceCode: [
        {
            url: 'https://github.com/rob2d/modnao',
            description: 'Github'
        }
    ],
    links: [
        {
            url: 'https://modnao.vercel.app',
            description: 'Website'
        }
    ]
};
