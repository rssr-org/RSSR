require('../setup/evnLoader'); // load .env files and define environment varibale before all actions

const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const StatsPlugin = require('stats-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CLIENT_NAME, DIST_PATH, SCSS_PATH, CLIENT_PATH, SERVER_PATH, SERVER_NAME, SASS_NAMESPACE_LOADER, IGNORE_CSS_IN_SERVER} = require('../setup/constant');


module.exports = [
    //---------------- client ----------------//
    {
        name: 'client',
        mode: 'production',
        target: 'web',
        performance: {hints: false},
        entry: CLIENT_PATH,
        output: {
            path: DIST_PATH,
            filename: CLIENT_NAME,
            publicPath: DIST_PATH,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
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
                                // modules: true,
                                // localIdentName: '[local]__[hash:base64:5]',
                                // sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                // sourceMap: true,
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
            new CleanWebpackPlugin(["dist"], {
                root: process.cwd(),
                verbose: true,
                dry: false
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.IgnorePlugin(/async-local-storage/)
        ],
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_console: true,
                            drop_debugger: true
                        },
                        output: {
                            comments: false,
                            beautify: false
                        },
                    },
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCssAssetsPlugin({})
            ]
        }
    },

    //---------------- server ----------------//
    {
        name: 'server',
        mode: 'production',
        target: 'node',
        performance: {hints: false},
        entry: SERVER_PATH,
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
                    use: IGNORE_CSS_IN_SERVER
                }
            ]
        },
        plugins: [
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {discardComments: {removeAll: true}}
            }),
            new StatsPlugin('stats.json', {
                chunkModules: true,
                modules: true,
                chunks: true,
                exclude: [/node_modules[\\\/]react/],
            })
        ]
    }
];