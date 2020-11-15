const path = require('path');

// Possible command line arguments
//
// https    : whether to run in HTTPS mode
// ssl_cert : location of ssl certificate file
// ssl_key  : location of ssl key file
// ssl_ca   : location of ca file if using one

// ==================== //
// PATH-RELATED GLOBALS //
// ==================== //

global.basePath = path.resolve(__dirname, '/');

/**
 * Helper function which resolves to root
 * file __dirname/relPath
 */
global.resolvePath = function globalResolvePath(...args) {
    return path.resolve(global.basePath, ...args);
};

global.require = function globalRequire(...args) {
    return require(global.resolvePath(...args));
};

// ==================== //
//  IMPORT/BASIC SETUP  //
// ==================== //

// Set up SSL, config a globally viewable
// basepath (__base), and require node
// modules

const envFile = require('dotenv').config(); // funnel process.env vars
const express = require('express');
const fs = require('fs');
const EventEmitter = require('events');
const app = express();
const http = require('http');
const https = require('https');
const cors = require('cors');
const helmet = require('helmet');
const { argv } = require('yargs'); //grabs our app arguments
const colors = require('colors');
const bodyParser = require('body-parser');
const port = argv.port || process.env.PORT || 3002;
const env = process.env.NODE_ENV || 'development';


const sslConfig = (() => {
    if(argv.https) {
        const certPath = argv.ssl_cert;
        const keyPath = argv.ssl_key;
        const caPath = argv.ssl_ca;
        const config = { https : true, options : {} };

        if(caPath) {
            config.options.ca = fs.readFileSync(caPath);
        }
        else if(keyPath && certPath) {
            config.options.key = fs.readFileSync(keyPath);
            config.options.cert = fs.readFileSync(certPath);
        }
        else {
            console.error('https flag requires "cert" and ' +
                'key" or "ca" file parameters'
            );
            process.exit();
        }

        return config;
    }
    else return { https : false };
})();


// create a simple callback handler for our app

const appCallbackHandler = new EventEmitter();
app.set('eventHandler', appCallbackHandler);

// add connection ready event logger

app.get('eventHandler').on('dbConnReady', () => {
    console.log('db connection ready event emitted!');
});

// disable layout

app.set("view options", { layout: false });
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

//attach middleware to server

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ==================== //
//  API ROUTES          //
// ==================== //

// require backend routes

//app.use('/api', require('./routes/api'));
app.get('/api/*', (req,res) => {
    res.status(404).send('404 Error');
});

// ==================== //
// FRONT END ROUTING    //
// ==================== //

// Front end is configured to handle
// everything (including 404, though
// with more time would send proper
// code)

app.get('*', (req,res) => {
    res.render(
        path.join(__dirname,'public', 'index.html')
    );
});

// ==================== //
// START UP THE SERVER  //
// ==================== //

// Based on whether we're in SSL or not,
// launch a corresponding express server
// and give some an informative prompt to the
// user.

const startServer = server => {
    const { address } = server.address();
    const { port } = server.address();
    const { version, name } = require(path.resolve(__dirname, '../package.json'));
    const protocol = sslConfig.https ? 'https' : 'http';
    const host = (address == '0.0.0.0'|| address == '::') ? 'localhost' : address;

    console.log(`${'%s'.white}[v%s] %s`, name, version, argv.dev ? '(DEV MODE)' : '');
    console.log(
        `-> currently running at ${protocol.blue.bold}:${`//%s:%s`.blue.bold}` +
        ' in HTTP %s mode', host, port, sslConfig.https ? 'Secure' : 'Insecure'
    );

    if(!sslConfig.https) {
        console.log('(to enable HTTPS, run app with the ' +
            'flags "https", "ssl_cert" and "ssl_key")'
        );
    }

    return server;
};

const protocolSrc = sslConfig.https ? https : http;
const serverArgs = [app];

if(sslConfig.https) {
    serverArgs.splice(0, 0, sslConfig.options);
}

const server = protocolSrc.createServer(...serverArgs)
    .listen(port, () => startServer(server));
