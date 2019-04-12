import React from 'react'
import ReactDOM                      from 'react-dom'
import { RoutingApp }                from './modules'

// suppress warnings in prod for Three.js (which are
// simply due to glitches within the API itself)
// ugly but a bit inevitable

if(process.env.NODE_ENV == 'production') {
    console.warn = function(){}; 
}

ReactDOM.render((
    <RoutingApp />
), document.getElementById('app'));