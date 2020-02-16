export default {
    id : 'thanos',
    year : '2019',
    displayName : 'Thanos Slack Files',
    context : 'Independent',
    roles : 'Maintainer, Designer, Developer',
    techSet : new Set([
        'js',
        'nodejs',
        'slack-api'
    ]),
    shortDescription : 'Simple utility to easily remove the largest files ' +
        'and free up storage for your free-tier slack team/workspace.',
    description : [
        'When using the free tier Slack workspace, there are limitations on the ' +
        'amount of file size you are given. Considering the price of slack, the ' +
        'cost for something like a small hobby community can be pretty prohibitive; ' +
        'to help out with a group I was a part of on my free time, I quickly created' +
        'this Slack app/plugin ' +
        'to easily remove half of a slack community\'s largest public files (with ' +
        'an entertaining dialog to accompany that). It is useful as both a ' +
        'standalone Node Server and/or can integrate using a dedicated Slack bot.'
    ],
    links : ['https://www.npmjs.com/package/thanos-slack-files'],
    linkDescriptions : ['NPM Repo'],
    sourceCode : ['https://github.com/rob2d/thanos_slack_files'],
    sourceCodeDescriptions : ['GitHub'],
    mediaAspectRatio : 1.36,
    media : []
};
