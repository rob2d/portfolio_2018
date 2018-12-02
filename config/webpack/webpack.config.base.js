const fs = require('fs');
const { DefinePlugin } = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * 
 * helper function to populate an object
 * with aliases anywhere within a specified 
 * directory's root level for all folders
 * 
 * @param {String} subPath
 * @returns {Object} dict with [aliases] -> 'path'
 */
function createDirAliases (subPath) {
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
const reduxAliases  = createDirAliases('client/js/modules');

module.exports = {
  output : {
    filename : 'main.js',
    publicPath : '/'
  },
  module : {
    
    rules : [
      {
        test : /\.html$/,
        use  : [
          {
            loader: "html-loader",
            options: { minimize: (process.env.NODE_ENV == 'production') }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader : MiniCssExtractPlugin.loader,
            options : {
            }
          }, {
            loader : 'css-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false
            }
          },
          {
            loader : 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false
            } 
          }
        ],
      },
      {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/'
              }
          }]
      }
    ]
  },

  devServer: { 
    historyApiFallback: true
  },

  plugins : [
    new HtmlWebPackPlugin({
      template : "./client/index.html",
      filename : "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename : "style/[name].css",
      chunkFilename : "[id].css"
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'API_SERVER' : 'localhost:3002' // TODO : LOAD FROeM FILE DEPENDENT ON ENV
    }),

    // copy all files to be available statically
    // if they are not already bundled via
    // the webpack build process

    new CopyWebpackPlugin([
      { 
        from    : './client/**/*.*',
        to      : '',
        transformPath : (targetPath, sourcePath) => {
          // cut off 'client/' from path
          return targetPath.substr(7);
        }
      }
    ], {
      ignore  : [
        'client/*.*',
        'client/fonts/**',
        'client/fonts/**/*.*', 
        'client/style/**',
        'client/style/**/*.*', 
        'client/js/**',
        'client/js/**/*.*'
      ],
      copyUnmodified : true
    })
  ],

  resolve : {
    alias : {
      ...rootJSAliases,
      ...reduxAliases,
      common : global.resolvePath('server/utils/common')
    }
  }
};