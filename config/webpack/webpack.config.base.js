const fs = require('fs');
const path = require('path');
const { DefinePlugin } = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SRC_ROOT = 'client';
const DEST_ROOT = 'server/public';

const ignoredGlobPatternCopyOptions = {
    globOptions: {
        ignore: [
            '**/style/**',
            'client/style/**/*.*',
            'client/js/**',
            'client/js/**/*.*',
            '**/*.js',
            '**/*.html'
        ]
    }
};

/**
 *
 * helper function to populate an object
 * with aliases anywhere within a specified
 * directory's root level for all folders
 *
 * @param {String} subPath
 * @returns {Object} dict with [aliases] -> 'path'
 */
function createDirAliases(subPath) {
    const aliasDict = {};

    fs.readdirSync(global.resolvePath(subPath))
        .filter( fname =>
            fs.lstatSync(global.resolvePath(subPath, fname))
                .isDirectory()
        ).forEach( dirname =>
            aliasDict[dirname] = global.resolvePath(subPath, dirname)
        );

    return aliasDict;
}

const rootJSAliases = createDirAliases('client/js');
const reduxAliases = createDirAliases('client/js/modules');

module.exports = {
    entry: {
        main: './client/js'
    },
    output: {
        path: global.resolvePath(DEST_ROOT),
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    devServer: {
        hot: true,
        historyApiFallback: true
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendor',
                    enforce: true,
                    minChunks: 3
                },

                // Split code common to all chunks to its own chunk
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        },
        usedExports: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },

            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: { minimize: (process.env.NODE_ENV == 'production') }
                }]
            },
            {
                test: /\.svg$/,
                exclude: /fonts/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/icons'
                    }
                }]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /img/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }]
    },

    plugins: [
        new NodePolyfillPlugin(),
        new HtmlWebPackPlugin({
            template: "./client/index.html",
            filename: "./index.html"
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'API_SERVER': 'localhost:3002', // TODO : LOAD FROM FILE DEPENDENT ON ENV
            'SITE_NAME': '"Robert Concepción III"'
        }),

        // copy all files to be available statically
        // if they are not already bundled via
        // the webpack build process

        new CopyWebpackPlugin({
            patterns: [{
                from: `./${SRC_ROOT}/**/*.*`,
                to: ({ context, absoluteFilename }) => {

                    // TODO: precalculate normalized SRC_ROOT, DEST_ROOT
                    // so this op isn't repeated many times

                    const srcRoot = path.join(context, SRC_ROOT);
                    const destRoot = path.join(context, DEST_ROOT);
                    return path.normalize(absoluteFilename).replace(srcRoot, destRoot);
                },
                ...ignoredGlobPatternCopyOptions
            }, {
                from: `./${SRC_ROOT}/manifest.json`,
                to: '',
                ...ignoredGlobPatternCopyOptions
            },
            {
                from: `./${SRC_ROOT}/`,
                to: '',
                ...ignoredGlobPatternCopyOptions
            },
            ...(process.env.NODE_ENV == 'production' ?
                [
                    {
                        from: `./${SRC_ROOT}/robots.txt`,
                        to: '',
                        ...ignoredGlobPatternCopyOptions
                    },
                    {
                        from: `./${SRC_ROOT}/sitemap.xml`,
                        to: '',
                        ...ignoredGlobPatternCopyOptions
                    },
                ] : []
            )]
        })
    ],

    resolve: {
        alias: {
            ...rootJSAliases,
            ...reduxAliases,
            'components': global.resolvePath('client/js/utils/components'),
            'page-layout': global.resolvePath('client/js/utils/components/page-layout'),
            'img': global.resolvePath('client/img'),
            'app-root': global.resolvePath('client/js'),
            'common': global.resolvePath('server/utils/common')
        }
    }
};
