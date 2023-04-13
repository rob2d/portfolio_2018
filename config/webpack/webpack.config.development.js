const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: require.resolve('babel-loader'),
                    options: {
                        cacheDirectory: true,
                        plugins: [require.resolve('react-refresh/babel')]
                    }
                }]
            }
        ],
    },
    plugins: [new ReactRefreshWebpackPlugin()]
};
