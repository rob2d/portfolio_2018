const projects = [{
    title: '3D SEGA Dreamcast Model Viewer and Texture Editor',
    techs: ['React', 'Redux', 'THREE.js', 'Next.js', 'Jest'],
    years: 'May 2023 - Present',
    points: [
        'Designed and developed a browser based application which takes user-selected SEGA Dreamcast/Naomi ' +
        'binary files into memory, reads, parses, and allows a user to interactively see a 3D scene where they can navigate and ' +
        'make selections in realtime and edit various aspects such as textures with intuitive gestures and options live in 60fps. ',

        'Levaraged Typescript, React, Material-UI 5.x, React-three-fiber /Three.JS, Node.js\' Buffer API and Redux-toolkit to iteratively develop, and Vercel/Next.js platform for the API and to build, test and deploy, and Jest for testing.',

        'Work ranged from low level reverse engineering of binary formats including vector quantized images, lzss compression/decompression, and several others to ' +
        'using a k-means clustering for a machine learning algorithm for optimizing choices when compressing images, to desiging the UX and UI for the application, ensuring simple ' +
        'data flow at bigger picture, to exploring and implementing various 3D rendering techniques to achieve the desired effects as well as optimization ' +
        'for a modern/seamless client experience.',

        'Within a few months part time, has been used for branding at major e-sports events for the games that it supports by external users and ' +
        'picked up without an explicit tutorial -- in large part due to ease-of-use and streamlined UX. Was used for a Japanese to English translation ' +
        'project where I was responsible for all graphics conversions in native format using tools developed for this project to aid in asset conversions.'
    ]
}];

export default projects;
