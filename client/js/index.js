import React from 'react'
import ReactDOM                      from 'react-dom'
import { RoutingApp }                from './modules'
import { AppContainer }              from 'react-hot-loader'

smoothscroll.polyfill(); // enable smoothscroll in DOM

// suppress warnings in prod for Three.js (which are
// simply due to glitches within the API itself)
// ugly but a bit inevitable

if(process.env.NODE_ENV == 'production') {
    console.warn = function(){}; 
}

ReactDOM.render(
    (<div>Hey!</div>),
    document.getElementById('app')
);