const path = require('path');

module.exports = {
    CLIENT_NAME: 'client.js',
    CLIENT_PATH: './src/render/client.js',

    SERVER_NAME: 'server.js',
    SERVER_PATH: './src/render/server/server.js',

    DIST_ROUTE: '/dist',
    DIST_PATH: path.resolve(process.cwd(), './dist'),

    PUBLIC_PATH: path.resolve(process.cwd(), './public'),

    SCSS_PATH: path.resolve(process.cwd(), './src/setup/style'),

    SASS_NAMESPACE_LOADER: path.resolve('src/Partial/Namespace/namespace-loader.js'),

    IGNORE_CSS_IN_SERVER: path.resolve('provider/webpack/loader/ignoreCssInServer.js'),
}