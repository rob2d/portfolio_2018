import generateMediaImages from './data-helpers/generateMediaImages';

export default {
    id: 'chinesepoker',
    displayName: 'Chinese Poker Online',
    year: '2011',
    context: 'Undergraduate Seminar',
    roles: 'Programming, Planning & Design',
    technologies: ['android_sdk', 'java', 'mysql', 'php'],
    shortDescription: 'An interactive rendition of "Big Two" card game for Android featuring realtime online gameplay',
    description: [
        'Chinese Poker Online was a game which during the years it was released (2011) had very ' +
        'bright colorful graphics and online play on a mobile platform which was rare for a card game. It was' +
        'based on a game called "Big Two" which I often played in highschool at lunch',
        'Although not my first application by a long shot, Chinese Poker Online was my first ' +
        'truly large-scale application created in a professional programming language. Prior to it, ' +
        'I had dabbled quite a lot in C and JavaScript but had not ever completed a large project with any of them. ',
        'Chinese Poker Online was a very ambitious first-scalable project as it leveraged a custom game API I had been ' +
        'building outside of my Programming 2 and Data Structures class.'
    ],
    mediaAspectRatio: 1.662337662337662,
    media: {
        items: [
            { type: 'video', videoId: 'F91K9oWimSg' },
            ...generateMediaImages('chinesepoker', 4, [
                'Undergraduate seminar project demo intro',
                'Title Screen',
                'Welcome Menu',
                'Start of a new game',
                'Managing a hand for a play'
            ])
        ]
    },
    sourceCode: [
        {
            url: 'https://github.com/rob2d/cpo_android',
            description: 'Github'
        }
    ]
};
