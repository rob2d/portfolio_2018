const ImageminPlugin = require('imagemin-webpack-plugin').default;
const TerserPlugin = require('terser-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { args } = global;

const config = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    // eslint-disable-next-line camelcase
                    compress: { drop_console: true },
                    output: { comments: false }
                },
            }),
        ],
    },

    plugins: [
        new ImageminPlugin({ pngquant: { quality: '95-100' } }),
        new ImageminWebpWebpackPlugin()
    ]
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

if(args && (args.export_standalone=="true")) {
    const dateStr = moment(new Date())
        .format('YYYY-MM-DD-HHmmss');

    let buildDir = path.join('builds', dateStr);

    if(!fs.existsSync('./builds/')) {
        fs.mkdirSync('./builds/');
    }

    if(fs.existsSync(`${buildDir}/`)) {
        let charSuffix = 'a';

        while(!fs.existsSync(`${buildDir}(${charSuffix})/`)) {
            charSuffix++;
        }

        buildDir = `${buildDir}(${charSuffix})`;
    }

    fs.mkdirSync(buildDir);
    console.log(`Creating an exportable production build at:\n\t${buildDir}`);

    config.plugins.push(
        new FileManagerPlugin({
            onStart: {
                delete: ['server/public/**']
            },
            onEnd: {
                copy: [
                    {
                        source: 'server/public/**',
                        destination: path.join(global.basePath, buildDir)
                    }, {
                        source: 'server/*.js',
                        destination: path.join(global.basePath, buildDir)
                    },
                    {
                        source: 'package.json',
                        destination: path.join(global.basePath, buildDir, 'package.json')
                    }
                ]
            }
        })
    );

    // TODO : add args.zip flag for convenience
}

module.exports = config;
