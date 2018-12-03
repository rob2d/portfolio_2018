const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const rootConfigPath = './config/webpack/webpack.config';

// ==========================//
//  Path Resolution Helpers  //
// ==========================//

/**
 * points to root folder __dirname
 */
global.basePath = __dirname;

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

// ==========================//
//   Webpack Config Module   //
// ==========================//

module.exports = (env, args) => {
	global.args = args; // not a pretty solution
						// but for the sake of time,
						// lets us inspects arguments
						// in other marged configs

	const { mode } = args;

	// webpack does not explicitly set node_env,
	// but many other build processes rely on it;
	// note that if we have issues we shoudl consider
	// setting this at OS level as well
	//(see: https://github.com/webpack/webpack/issues/7074)
	
	process.env.NODE_ENV = mode || 'development';
	
	// if we provide a mode (specific namespaced development/production)
	// argument and detect a corresponding file, merge a basic level 
	// config with the config specified in the file. Otherwise, simple
	// load up basic config

	const baseConfig = require(`${rootConfigPath}.base.js`);
	const modeConfigPath = `${rootConfigPath}.${mode}.js`;

	if(mode && fs.existsSync(modeConfigPath)) {
		let modeConfig = require(modeConfigPath);
		return merge(baseConfig, modeConfig);		
	} else {
		return baseConfig;
	}
};
