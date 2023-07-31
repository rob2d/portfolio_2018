const projects = [{
    title: '3D SEGA Dreamcast Model Viewer and Texture Editor',
    techs: ['React', 'Redux', 'THREE.js', 'Typescript', 'Next.js'],
    years: 'May 2023 - Present',
    points: [
        'Designed and developed a browser based application which takes user-selected SEGA Dreamcast/Naomi ' +
        'binary code into memory, reads, parses, and allows a user to interactively see a 3D scene where they can navigate and ' +
        'make selections in realtime and edit various aspects such as textures with intuitive gestures and options in 60fps. ',

        'Levaraged Typescript, React, Material-UI 5.x, React-three-fiber /Three.JS, and Redux-toolkit to iteratively develop, and Vercel/Next.js platform for the API and to build, test and deploy.',

        'Within the first three months of development part time, has been used for branding at major e-sports events for the games that it supports by external users and ' +
        'picked up by various players without a need to explain the UX with an explicit tutorial -- in large part due to ease-of-use and intuitive design.'
    ]
}, {
    title: 'Commercial JavaScript Game Engine Optimization',
    techs: ['JavaScript', 'NW.js'],
    years: 'June 2023 - July 2023',
    points: [
        'Optimized the Javascript side of a commercial in-house game engine based on RPG Maker resulting in an over 20 frames-per-second improvement ' +
        'on limited Nintendo Switch hardware.',

        'Collaborated with technical director of independent game studio on contract totaling 80 hours to optimize a Nintendo Switch port of several ' +
        'titles with a custom environment in NW.js (a technology which packages Chromium and Node.js). Wrote a tool to profile certain metrics ' +
        'that disproportionately affected a custom runtime that was not Chromium/v8-based. ' +
        'Optimizations kept in consideration a large codebase and compatibility maintained between platforms and for prototypical inheritence based plugins.',
    ]
},
{
    title: 'Home Arcade Input Drivers',
    techs: ['React Native', 'Java', 'Android SDK', 'Gradle'],
    years: '2021 - 2022',
    points: [
        'Over several months, wrote several patches for Marvel/Disney-IP licensed products for consumer electronics firmware to keep certain skills intact and expand upon others. ',

        'Learned to reverse engineer Android packages and fully rewrote a targeted set of code for QOL improvements via CPU optimizations. These were accompanied ' +
        'by self-designed visual interfaces using React Native builds with signing and device targeting orchestrated via Gradle. ',

        'Designed UI screens, tested with users, and pitched/collaborated changes with a license holding company to implement ' +
        'features for official OTA updates to consumers after this work was noticed online.'
    ]
}];

export default projects;
