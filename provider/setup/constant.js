const path = require('path');

const C = {};

// dist
C.DIST_NAME = 'dist';
C.DIST_ROUTE = '/' + C.DIST_NAME;
C.DIST_PATH = path.resolve(process.cwd(), '.' + C.DIST_ROUTE);

// client
C.CLIENT_NAME = 'client.js';
C.CLIENT_ROUTE = './src/render/' + C.CLIENT_NAME;

// server
C.SERVER_NAME = 'server.js';
C.SERVER_ROUTE = './src/render/server/' + C.SERVER_NAME;
C.SERVER_DIST_PATH = path.resolve(C.DIST_PATH, C.SERVER_NAME);

// public
C.PUBLIC_NAME = 'public';
C.PUBLIC_PATH = path.resolve(process.cwd(), './' + C.PUBLIC_NAME);

// style
C.SCSS_PATH = path.resolve(process.cwd(), './src/setup/style');

// loader
C.IGNORE_CSS_IN_SERVER = path.resolve('provider/webpack/loader/ignoreCssInServer.js');

module.exports = C