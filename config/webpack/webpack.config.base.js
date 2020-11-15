const fs = require('fs');
const { DefinePlugin } = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SRC_ROOT = 'client';

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
        path: global.resolvePath('server/public/'),
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            name: true,
            cacheGroups: {
                vendor: {
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
        rules: [{
            test: /\.html$/,
            use: [{
                loader: "html-loader",
                options: {
                    minimize: (process.env.NODE_ENV == 'production')
                }
            }]
        },
        /*
        {
            test: /\.(sa|sc|c)ss$/,
            exclude: /img/,
            use: [{
                loader : MiniCssExtractPlugin.loader,
                options: {
                }
            }, {
                loader: 'css-loader',
                options: {
                    sourceMap: false
                }
            }]
        },
        */
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

    devServer: {
        historyApiFallback: true
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./client/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "style/[name].css",
            chunkFilename: "[id].css"
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'API_SERVER': 'localhost:3002', // TODO : LOAD FROM FILE DEPENDENT ON ENV
            'SITE_NAME': '"Robert Concepción III"'
        }),

        // copy all files to be available statically
        // if they are not already bundled via
        // the webpack build process

        new CopyWebpackPlugin([
            {
                from: `./${SRC_ROOT}/**/*.*`,
                to: '',
                transformPath: (target, src) => target.substr(`${SRC_ROOT}/`.length)
            },
            {
                from: `./${SRC_ROOT}/favicon.ico`,
                to: ''
            },
            ...(process.env.NODE_ENV == 'production' ?
                [
                    { from: `./${SRC_ROOT}/robots.txt`, to: '' },
                    { from: `./${SRC_ROOT}/sitemap.xml`, to: '' }
                ] : []
            )], {
            ignore: [
                'client/*.*',
                'client/style/**',
                'client/style/**/*.*',
                'client/js/**',
                'client/js/**/*.*'
            ],
            copyUnmodified: true
        })
    ],

    resolve: {
        alias: {
            ...rootJSAliases,
            ...reduxAliases,
            'img': global.resolvePath('client/img'),
            'app-root': global.resolvePath('client/js'),
            'common': global.resolvePath('server/utils/common')
        }
    }
};
