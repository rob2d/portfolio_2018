import React from 'react';
import generateMediaImages from './data-helpers/generateMediaImages';

export default {
    id : 'smartwalk',
    year : '2014 - 2017',
    displayName : 'SmartWALK',
    context : 'PMC Technology',
    roles : 'Senior Web Application Developer & UI/UX Designer',
    techSet : new Set([
        'js',
        'react',
        'fbflux',
        'nodejs',
        'mysql',
        'gulp',
        'yui3'
    ]),
    shortDescription : 'Feature-rich web app designed for electrical engineers ' +
        'to map and survey equipment and power systems within ' +
        'buildings',
    description : [
        'SmartWALK is an application designed to provide assistance for electrical ' +
        'engineers who survey large skyscrapers and other facilities. Essentially, ' +
        'it allows them to track equipment, personnel, shifts and information ' +
        'about whether or not work was performed as well as metrics which are ' +
        'critical to detect whether a power system or other electronics may malfunction.',

        'Because of the critical role of this application in several key pieces of infrastructure such as the ' +
        'Empire State Building, JFK Airport and the new World Trade Center, a high emphasis was placed on ' +
        'security and reliability.',

        'When first working on this project in 2014, the company was fully bootstrapped and had two software ' +
        'developers (myself included) and a third person who was familiar with the business who also doubled as dev-ops. ' +
        'We took it upon ourselves to set an agreed upon standard for UI, development process, scrum, etc. ',
        'My primary responsibility was initially to create the database (which I modeled many concepts from a grad ' +
        'course found in the universal health care centralized database), and researched technologies and independently ' +
        'created a Node server as well as a highly interactive CMS for arranging building layouts which communicated with an ' +
        'Android app. This first application was built with NodeJS on the backend and YUI3 on the frontend and ' +
        ' somehow still running and servicable today in JFK airport (uses intranet and has a different license agreement).',

        'A second iteration of the application was created to meet the demands of hightened security for new clients ' +
        'such as the New York Stock Exchange and Chase Bank as well as cloud based centralization of the API. I shifted my focus ' +
        'to the front-end and became proficient in React and Flux to meed the needs of the new app. ' +
        'By the time I left PMC in 2017, we had expanded to 6 developers, of which one I was mentoring, a project ' +
        'manager above us, and a small QA team. This application is still being used and expanded upon today.',

        (
            <i>
                Sidenote: In some screens on the top right, there are a ton of UI
                Icons instead of an intuitive menu. This was extremely temporary as
                we were working on a major new client deal and as a UI/UX designer
                can concede definitely hideous (PMC was nice enough to let me post
                this and it would be unethical to include something I was not
                involved in afterwards).
            </i>
        )
    ],
    links : [
        'https://smartwalk.tech/',
        'https://app.smartwalk.tech/'
    ],
    linkDescriptions : [
        'Marketing Website',
        'Client Login to the CMS'
    ],
    mediaAspectRatio : 1.79,
    media : generateMediaImages('smartwalk', 5),
    mediaAspectRatio : 1.79,
    mediaCaptions: [
        'Intuitive media management and photo uploading for items',
        'Graphing out for multiple points of data in a scalable system',
        'Convenient User Account System with security features',
        '2014-2015 version; created using jQuery and YUI3 on the front-end',
        '2014-2015 server: first Node app; worked very well as we scaled and ' +
        'fleshed out the product, but immediately you can tell that it is ' +
        'not RESTful at all 😢'
    ]
};
