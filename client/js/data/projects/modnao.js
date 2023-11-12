export default {
    id: 'modnao',
    displayName: 'ModNao',
    year: '2023',
    context: 'Independent',
    roles: 'Developer, Maintainer',
    technologies: ['ts', 'react', 'redux', 'jest'],
    shortDescription: 'Intuitive 3D model browser and texture editor for a targeted set of Dreamcast games',
    description: [
        'Intuitive graphical editor with no technical knowledge necessary for those interested in making edits directly to Dreamcast ROM files; written in React, Redux, Three.js/React Three Fiber, Next.js. ',
        'It works by letting a user directly select a game\'s raw binary (ROM), and then from there they can interactively select models using mouse and GUI and control a scene and edit textures or pinpoint exactly what they\'re selecting in realtime.',
        'This was a great learning opportunity for me to learn about 3D rendering, image formats, data-compression, and I even found a reason to use a machine-learning based k-means clustering algorithm for assembling vector-image quantized data for some of ' +
        'the export functionality to optimize images better than the original game\'s compression.',
        'It has been used extensively for most in-person game events for Marvel vs Capcom 2 used by several communities organically for branding and has been picked up by various users without an explicit tutorial -- in large part due to ease-of-use and streamlined UX.',
        '[Note: this entry is a placeholder, screenshots and animations will be added soon -- but there are many animations provided in the pull requests in the github repo linked below!]'
    ],
    media: {
        aspectRatio: 1.2944,
        items: []
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
