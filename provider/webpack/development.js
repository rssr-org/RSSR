const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CLIENT_NAME, DIST_ROUTE, SCSS_PATH, CLIENT_PATH, SERVER_PATH, SERVER_NAME, SASS_NAMESPACE_LOADER, IGNORE_CSS_IN_SERVER} = require('../setup/constant');


//?quiet=true
module.exports = [
    //---------------- client ----------------//
    {
        name: 'client',
        mode: 'development',
        target: 'web',
        devtool: 'source-map',
        entry: ['webpack-hot-middleware/client?name=client&reload=true', CLIENT_PATH],
        output: {
            filename: CLIENT_NAME,
            publicPath: DIST_ROUTE,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                        "babel-loader",
                        "eslint-loader"
                    ]
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        {
                            loader: 'css-hot-loader?cssModule=true',
                        },
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                // modules: true,
                                // localIdentName: '[local]__[hash:base64:5]',
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                outputStyle: 'compressed',
                                includePaths: [SCSS_PATH]
                            }
                        },
                        {
                            loader: SASS_NAMESPACE_LOADER
                        }
                    ]
                },
                {
                    test: require.resolve('jquery'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }, {
                        loader: 'expose-loader',
                        options: '$'
                    }]
                }
            ],
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            new MiniCssExtractPlugin({
                filename: 'styles.css'
            }),
            new Dotenv({systemvars: true}),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.IgnorePlugin(/async-local-storage/)
        ]
    },

    //---------------- server ----------------//
    {
        name: 'server',
        mode: 'development',
        target: 'node',
        devtool: 'source-map',
        entry: ['webpack-hot-middleware/client?name=server&reload=true', SERVER_PATH],
        output: {
            filename: SERVER_NAME,
            libraryTarget: 'commonjs2',
            publicPath: DIST_ROUTE,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                        "babel-loader",
                        "eslint-loader"
                    ]
                },
                {
                    test: /\.(css|scss)$/,
                    use: IGNORE_CSS_IN_SERVER
                }
            ],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
];
