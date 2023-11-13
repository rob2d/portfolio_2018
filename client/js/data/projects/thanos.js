export default {
    id: 'thanos',
    year: '2019',
    displayName: 'Thanos Slack Files',
    context: 'Independent',
    roles: 'Designer, Developer',
    technologies: ['js', 'nodejs', 'slack-api'],
    shortDescription: 'Simple utility to easily remove the largest files ' +
        'and free up storage for your free-tier slack team/workspace.',
    description: [
        'When using the free tier Slack workspace, there are limitations on the ' +
        'amount of file size you are given. Considering the price of slack, the ' +
        'cost for something like a small hobby community can be pretty prohibitive; ' +
        'to help out with a group I was a part of for a bit, I quickly created' +
        'this Slack app/plugin to easily remove half of a slack community\'s largest ' +
        'public files (with an entertaining dialog to accompany that).',
        'Note that this was done in a bit of a rush and just a proof of concept, ' +
        'but it was a fun little project.'
    ],
    links: [{
        url: 'https://www.npmjs.com/package/thanos-slack-files',
        description: 'NPM Repo'
    }],
    sourceCode: [{
        url: 'https://github.com/rob2d/thanos_slack_files',
        description: 'GitHub'
    }]

};
