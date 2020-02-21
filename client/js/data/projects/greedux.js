import React from 'react';
import generateMediaImages from './data-helpers/generateMediaImages';

export default {
    id : 'greedux',
    year  : '2017-2018',
    displayName : 'Greedux',
    context : 'Independent',
    roles : 'Maintainer, Designer and Developer',
    technologies : ['js','nodejs','gulp','react','redux','yeoman'],
    shortDescription : (
        'Simple workflow template to get a jumpstart on React/Redux applications.'
    ),
    description : [
        'A simple workflow template for React/Redux applications ' +
        'which features live reloading, JSS, cache-busting, optimization/compression, instantaneous ' +
        'and flexible production-level deployment and a few other neat things or what you would otherwise ' +
        'expect in your web build systems. ' +
        'Well documented and simple installation, and then you\'re good to go. No need to fiddle with webpack ' +
        'or other technologies when you have little time -- it just relies on Gulp and Babel and the ' +
        'code is all very transparent and simple to read/modify (caveat: I have recently massively refactored the build ' +
        'code on recent projects such as this portfolio and this is not quite yet in the repo 😅). ',

        'I developed this as a need to scratch my own itch as it is always a hassle to keep all of your ' +
        'installation parts up to date for React/Redux apps. I also tend to have used Gulp a lot for other ' +
        'deployment processes (such as minimal packaging for quick AWS serverless deployment, processing files, etc.), ' +
        'so it has been convenient on small teams when we didn\'t quite have the resources to spin up a full deployment ' +
        'system from scratch (CRA and other alternatives I\'ve found have not provided too much in terms of production ' +
        'ready tools).',

        (<span>
            I have deployed 8 front-end projects since late 2016 with it. It was used to create a decent starting point for
            several very high profile projects that I am aware of, such as <a href={ '/projects/smartwalk' }>an engineering app</a> to support most of the Fortune 500
            company-housed skyscrapers in NYC today as well as the official newspaper for a top highschool in the US
            (<a href={ 'http://www.stuyspec.com' } target={ '_new' }>http://www.stuyspec.com</a>). It was also used to spin up much less
            high profile/ground-shaking projects -- such as this portfolio!
        </span>)
    ],
    links : [{
        url : 'https://www.npmjs.com/package/generator-greedux',
        description : 'NPM Repo'
    }],
    sourceCode : [{
        url : 'https://github.com/rob2d/greedux/',
        description : 'Github'
    }],
    media : {
        items : [...generateMediaImages('greedux', 1, [
            (<i>"Look ma, no peeking into console!"</i>)
        ])]
    }
};
