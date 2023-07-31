const projects = [{
    title: '3D SEGA Dreamcast Model Viewer and Texture Editor',
    techs: ['React', 'Redux', 'THREE.js', 'Typescript', 'Next.js'],
    years: 'April 2023 - Present',
    points: [
        'Designed and developed a browser based application which takes user-selected SEGA Dreamcast/Naomi ' +
        'binary code into memory, reads, parses, and allows a user to interactively see a 3D scene where they can navigate and ' +
        'make selections in realtime and edit various aspects such as textures with intuitive gestures and options in 60fps. ',

        'Uses Typescript, React, Material-UI 5.x, React-three-fiber /Three.JS, and Redux-toolkit to iteratively develop, and Vercel/Next.js platform for the API and to build, test and deploy.',

        'Designed in a way that can be used by non technical people with no knowledge of professional 3D editing software or coding.',

        'Within the first three months of development part time, has been used for branding at major e-sports events for the games that it supports by external users and ' +
        'picked up by various players without a need to explain the UX with an explicit tutorial -- in large part due to ease-of-use and intuitive design.'
    ]
}, {
    title: 'Home Arcade Input Drivers',
    techs: ['React Native', 'Java', 'Android SDK', 'Gradle'],
    years: '2021 - 2022',
    points: [
        'Over several months on weekends, wrote several patches for Marvel/Disney-IP licensed products for video ' +
        'game/consumer electronics firmware to keep certain skills intact and expand on others. ',

        'This was purely volunteer to start, and work involved included learning to reverse engineer Android packages; ' +
        'fully rewriting a targeted set of code for quality of life improvements via CPU optimizations. These were accompanied ' +
        'by self-designed visual interfaces using React Native builds with signing and device targeting orchestrated via Gradle. ',

        'Designed UI screens, and tested with users, and also pitched/collaborated changes with the license holding company to implement ' +
        'features in some product updates officially over the air to consumers after this work was noticed by representatives there. ',
        'Created a proof of concept using latest Android SDK to demo some more modern technologies with a streamlined build for a separate app.',
    ]
}];

export default projects;
