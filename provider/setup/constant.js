const path = require('path');

module.exports = {
    CLIENT_NAME: 'client.js',
    CLIENT_PATH: './src/render/client.js',

    SERVER_NAME: 'server.js',
    SERVER_PATH: './src/render/server/server.js',

    DIST_ROUTE: '/dist',
    DIST_PATH: path.resolve(process.cwd(), './dist'),

    PUBLIC_PATH: path.resolve(process.cwd(), './public'),

    SCSS_PATH: path.resolve(process.cwd(), './src/setup/style')
}