const projects = [{
    title: 'ModNao',
    techs: ['React', 'Redux', 'Typescript'],
    years: '2023',
    points: [
        'A browser based application which takes user-selected SEGA Dreamcast binary code into memory, ' +
        'reads, parses, and allows a user to interactively see a 3D scene where they can navigate and ' +
        'make selections in realtime. ',

        'Features include a dynamically updating panel that shows textures selected in any given object by a user.',

        'Written between most recent position and now to demonstrate technical proficiency in writing performant/scalable ' +
        'applications in modern React paradigms as well as being capable/willing to learn other new concepts quickly.'
    ]
}, {
    title: 'Home Arcade Input Drivers',
    techs: ['React Native', 'Java', 'Android SDK', 'Gradle'],
    years: '2021-2022',
    points: [
        'Over many Saturdays and a few evenings, wrote several patches for Marvel/Disney-IP licensed products for video ' +
        'game/consumer electronics firmware to keep certain skills intact and expand others. ',

        'This was purely volunteer to start, and work involved included learning to reverse engineering Android packages, ' +
        'then fully rewriting a targeted set of quality of life improvements and CPU optimizations. These were accompanied ' +
        'by dynamic interfaces using React Native builds that were designed to work seamlessly for testing sessions. this with application ' +
        'signing and device targeting via Gradle.',

        'Designed and tested with users, and also pitched/collaborated changes with the license holding company to implement ' +
        'features in some product updates officially over the air to consumers after this work was noticed by representatives there. ',
        'Also created a proof of concept using latest Android SDK to demo some more modern technologies. Was credited for contributions.',
    ]
}];

export default projects;
