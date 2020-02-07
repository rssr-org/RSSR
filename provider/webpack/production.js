require('rssr-env-loader'); // load .env files and define environment varibale before all actions

const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CLIENT_NAME, DIST_PATH, SCSS_PATH, CLIENT_ROUTE, SERVER_ROUTE, SERVER_NAME} = require('../setup/constant');



module.exports = [
    //---------------- client ----------------//
    {
        name: 'client',
        mode: 'production',
        target: 'web',
        performance: {hints: false},
        entry: CLIENT_ROUTE,
        output: {
            path: DIST_PATH,
            filename: CLIENT_NAME,
            publicPath: DIST_PATH,
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    outputStyle: 'compressed',
                                    includePaths: [SCSS_PATH]
                                }
                            }
                        },
                        {
                            loader: 'rssr-namespace/loader.js'
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
            ]
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
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.IgnorePlugin(/async-local-storage/)
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false,
                        }
                    },
                    extractComments: {
                        banner: false
                    },
                    extractComments: false,
                }),
                new OptimizeCssAssetsPlugin({
                    cssProcessorOptions: {discardComments: {removeAll: true}}
                })
            ]
        }
    },

    //---------------- server ----------------//
    {
        name: 'server',
        mode: 'production',
        target: 'node',
        performance: {hints: false},
        entry: SERVER_ROUTE,
        output: {
            path: DIST_PATH,
            filename: SERVER_NAME,
            libraryTarget: 'commonjs2',
            publicPath: DIST_PATH,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                        {
                            loader: 'babel-loader',
                        }
                    ]
                },
                {
                    test: /\.(css|scss)$/,
                    use: 'ignore-loader'
                }
            ]
        }
    }
];
