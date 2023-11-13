import generateMediaImages from './data-helpers/generateMediaImages';

export default {
    id: 'bw',
    displayName: 'Build & Watch',
    year: '2018',
    context: 'Independent',
    roles: 'Designer, Developer',
    technologies: ['js', 'nodejs', 'c'],
    shortDescription: (
        'A simple retro-Gameboy ROM development workflow tool ' +
        'built using NodeJS'
    ),
    description: [
        (<span>
            This project started from a bet between a co-worker among several of
            us that nobody was capable of creating a Gameboy ROM within a few
            days outside of work. It seemed like a great opportunity to get back in
            touch with certain aspects of computer science that I don't normally
            work with, so I jumped in!
        </span>),

        (<span>
            Along the way, we crowdsourced a lot of low-level information which was
            pretty tough to find. A talented friend and coworker of mine,
            <a href={ 'http://www.gmiller.net' } target={ '_new ' }>Greg Miller</a>,
            ended up winning that bet. I was preoccupied with re-learning C at the
            time to worry about building games, and ended up so fascinated by the
            technology/process (and noticing how painful it was for him), that I
            created this tool. Using his colorful feedback as he built a large scale
            game, I experimented with this for a few weekends here and there as it
            became a little bit of a side hobby between us.
        </span>),

        (<span>
            This sort of code-ified and automated what we had learned/painfully
            figured out so that we did not have to mess with very ancient build
            configurations anymore and could simply experiment with retro
            ROM development and instantly spin up prototype projects. It was
            also just a fun and practical way to dive deep into low level C and
            let me experiment with some ideas in NodeJS in regards to process
            management and libraries that synergistically became extremely
            useful for my primary work at the time.
        </span>),

        (<span>
            Nowadays, I would probably use VSCode folder settings to automate what is going on
            here and have learned a lot of better ways to do some of the automation since...
            But it was fun at the time.
        </span>)
    ],
    links: [
        {
            url: 'https://www.npmjs.com/package/build-and-watch',
            description: 'NPM Repo'
        },
        {
            url: 'http://www.gmiller.net/2018/07/gameboy-color-fix-it-felix-jr',
            description: 'Wreck it Ralph Remake Project (@Greg\'s Site)'
        }
    ],
    sourceCode: [{
        url: 'https://github.com/rob2d/build-and-watch#readme',
        description: 'Github'
    }],
    media: {
        aspectRatio: 1.36,
        items: [
            ...generateMediaImages('bw', 1, [
                'Making build processes for things from your childhood almost tolerable'
            ]),
            {
                type: 'video',
                videoId: 'FrXLMEPN4ew',
                caption: 'ROM Build running on a real Gameboy Color',
            },
            {
                type: 'video',
                videoId: 'f58abL3nUgM',
                caption: 'Greg\'s Project Progress Video'
            }
        ]
    }
};
