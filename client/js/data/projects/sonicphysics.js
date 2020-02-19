import generateMediaImages from './data-helpers/generateMediaImages';

export default {
    id : 'sonicphysics',
    displayName : 'Sonic 3 Physics',
    context : 'Independent',
    roles : 'Programming, Planning and Artwork',
    year : '2005, 2009',
    technologies : ['gml'],
    shortDescription : `A pixel perfect rendition of the physics found in SEGA's
                        "Sonic the Hedgehog" series. `,
    description : [
        'This physics engine was actually part of a game I was ' +
        'developing called "Sonic: Corrupted Chaos" and was developed using a scripting language ' +
        'similar to JavaScript called GML. That game never came to fruition -- so I ' +
        'released this as an open source to an online community which I participated in as a ' +
        'teenager and it spun off into many independent games. It is a perfect representation of ' +
        'Yuji Naka\'s original "Sonic the Hedgehog" series for Sega Genesis\' physics.',
        'It started off as simply a way for me to practice coding after a hiatus from my ' +
        'eternal hobby after some time in the military, before I could start on my CSCI core courses. ' +
        'At the time, I had developed tendonitis in my elbows from a physically intensive job and got the ' +
        'itch to code while I couldn\'t get back to work. ',
        'Had I known there was a market, this could have been Sonic Mania years ago. ' +
        '"Should\'ve would\'ve, ' +
        'could\'ve", as they say. At the end of the day, it served its purpose as a good warm-up for ' +
        'coding again 🙂'
    ],
    media : {
        aspectRatio : 1.203,
        items : [
            {
                type : 'video',
                videoId : 'zRZOLzTaJq4',
                caption : 'Play-test video'
            },
            ...generateMediaImages('sonicphysics', 4, [
                'Pushing against spikes underwater',
                'Speed!',
                'Customizing Controller config',
                'Swimming as tails'
            ])
        ]
    },
    sourceCode : ['https://github.com/rob2d/sonic_gml'],
    sourceCodeDescriptions : ['Souce Code (GML) @ Github'],
    downloads : ['http://robftwcom.appspot.com/downloads/sonic360_demo.exe'],
    downloadDescriptions : ['Demo (Windows OS)'],
    documentation : ['http://corruptedchaos.blogspot.com/'],
    documentationDescriptions : ['Blogger'],
};
