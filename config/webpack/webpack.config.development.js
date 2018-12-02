module.exports = {
    module : {
        rules : [
          {
            test    : /\.(js|jsx)$/,
            exclude : /node_modules/,
            use : {
                loader: "babel-loader",
                options : {
                    cacheDirectory : true,
                    plugins : [ 
                        '@babel/plugin-proposal-export-default-from',
                        'react-hot-loader/babel' 
                    ],
                    presets : [
                        "@babel/preset-env",
                        "@babel/preset-react",
                        "@babel/preset-flow"
                    ]
                }
            }
          }
        ]
      }
};