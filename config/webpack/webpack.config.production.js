const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { args } = global;

const config = { 
    module : {
      rules : [
        {
          test    : /\.(js|jsx)$/,
          exclude : /node_modules/,
          use : {
              loader: "babel-loader"
          }
        }
      ]
    },
    plugins: [
      new ImageminPlugin({
        pngquant : {
          quality: '95-100'
        }
      })
  ],
  optimization : {
    minimizer : [
      new UglifyJsPlugin({
        uglifyOptions : {
          output : {
            comments : false
          }
        }
      })
    ]
  }
};

/*
|-------------------------------------------------|
| Create Exportable Standalone                    |
|-------------------------------------------------|
|
| if export_standalone specified in args,
| bundle up content into a timestamped folder
|
*/

if(args && args.export_standalone) {
  let dateStr = moment(new Date())
              .format('YYYY-MM-DD-HHmmss');

  let buildDir = path.join('builds', dateStr);

  
  if(!fs.existsSync('./builds/')) {
    fs.mkdirSync('./builds/');
  }

  if(fs.existsSync(buildDir + '/')) {
    let charSuffix = 'a';

    while(!fs.existsSync(`${buildDir}(${charSuffix})/`)) {
      charSuffix++;
    }

    buildDir = `${buildDir}(${charSuffix})`;
  }

  fs.mkdirSync(buildDir);
  console.log(`Creating an exportable production build at:\n\t${buildDir}`);

  config.plugins.push(
    new CopyWebpackPlugin([
      { 
        from : 'server/public/**', 
        to   : path.join(global.basePath, buildDir)
      }, { 
        from : 'server/*.js', 
        to   : path.join(global.basePath, buildDir)
      },
      {
        from : 'package.json',
        to   : path.join(global.basePath, buildDir, 'package.json')
      }])
  );

  // TODO : add args.zip flag for convenience
}

module.exports = config;