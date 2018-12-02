import 'babel-polyfill'
import smoothscroll from 'smoothscroll-polyfill'
import React from 'react'
import ReactDOM                      from 'react-dom'
import { RoutingApp }                from './modules'
import { AppContainer }              from 'react-hot-loader'

smoothscroll.polyfill(); // enable smoothscroll in DOM

// suppress warnings in prod for Three.js (which are
// simply due to glitches within the API itself)
// ugly but a bit inevitable; do not want to reveal
// api info to bots/malware

if(process.env.NODE_ENV == 'production') {
    console.warn = function(){}; // now warnings do nothing!
}

ReactDOM.render(
    (<AppContainer><RoutingApp/></AppContainer>),
    document.getElementById('app')
);