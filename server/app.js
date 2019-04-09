
// Possible command line arguments
//
// https    : whether to run in HTTPS mode
// ssl_cert : location of ssl certificate file
// ssl_key  : location of ssl key file 
// ssl_ca   : location of ca file if using one 

// ==================== //
// PATH-RELATED GLOBALS //
// ==================== //

global.basePath = __dirname + '/';

/**
 * Helper function which resolves to root
 * file __dirname/relPath
 */
global.resolvePath = function(...args) {
	return path.resolve(global.basePath, ...args);
}

global.require = function(...args) {
    return require(global.resolvePath(...args));
}

// ==================== //
//  IMPORT/BASIC SETUP  //
// ==================== //

// Set up SSL, config a globally viewable 
// basepath (__base), and require node 
// modules

const envFile = require('dotenv').config(), // funnel process.env vars
      express = require('express'),
      path = require('path'),
      fs = require('fs'),
      EventEmitter = require('events'),
      app = express(),
      http = require('http'),
      https = require('https'),
      cors = require('cors'),
      helmet = require('helmet'),
      argv = require('yargs').argv, //grabs our app arguments
      colors = require('colors'),
      bodyParser = require('body-parser'),
      port = argv.port || process.env.PORT || 3002,
      env = process.env.NODE_ENV || 'development';
      

let sslConfig = (()=> {
    if(argv.https) {
        let certPath = argv.ssl_cert,
            keyPath = argv.ssl_key,
            caPath = argv.ssl_ca,
            config = { https : true, options : {} };      

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

app.get('eventHandler').on('dbConnReady', function() {
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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// ==================== //
//  API ROUTES          //
// ==================== //

// require backend routes 

//app.use('/api', require('./routes/api'));
app.get('/api/*', function(req,res) {
    res.status(404).send('404 Error');
});


// ==================== //
// FRONT END ROUTING    //
// ==================== //

// Front end is configured to handle
// everything (including 404, though
// with more time would send proper
// code)

app.get('*', function(req,res) {
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

let startServer = server => {
let host = server.address().address,
    port = server.address().port,
    version = require('./../package.json').version,
    appName = require('./../package.json').name,
    protocol = sslConfig.https ? 'https' : 'http';

    host = (host == '0.0.0.0'|| host == '::') ? 'localhost' : host;

    console.log('%s '.white + '[v%s] %s', appName, version, argv.dev ? '(DEV MODE)' : '');
    console.log('-> currently running at ' + protocol.blue.bold + '://%s:%s'.blue.bold +
                ' in HTTP %s mode', host, port, sslConfig.https ? 'Secure' : 'Insecure');
    
    if(!sslConfig.https) {
        console.log('(to enable HTTPS, run app with the ' + 
            'flags "https", "ssl_cert" and "ssl_key")'
        );
    }
    
    return server;
};

let protocolSrc = sslConfig.https ? https : http,
    serverArgs = [ app ];

if(sslConfig.https) {
    serverArgs.splice(0,0,sslConfig.options);
}

let server = protocolSrc.createServer(...serverArgs)
                    .listen(port, () => startServer(server) );