// support for Object.entries and Object.fromEntries
// with minimal overhead (for Safari and Edge users)
import './utils/polyfills/coreJsPolyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import RoutingApp from './RoutingApp';

// suppress warnings in prod for Three.js (which are
// simply due to glitches within the API itself)
// ugly but a bit inevitable

if(process.env.NODE_ENV == 'production') {
    console.warn = function warn() {};
}

const appElem = document.getElementById('app');

ReactDOM.createRoot(appElem).render(<RoutingApp />);
