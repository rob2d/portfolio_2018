import * as ReactDOMClient from 'react-dom/client';
import RoutingApp from './RoutingApp';

// suppress warnings in prod for Three.js (which are
// simply due to glitches within the API itself)
// ugly but a bit inevitable

if(process.env.NODE_ENV == 'production') {
    console.warn = function warn() {};
}

const appElem = document.getElementById('app');
const root = ReactDOMClient.createRoot(appElem);

root.render(<RoutingApp />);
