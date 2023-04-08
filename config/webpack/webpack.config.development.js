const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    plugins: [require.resolve('react-refresh/babel')]
                }
            }
        ],
    },
    plugins: [new ReactRefreshWebpackPlugin()]
};
