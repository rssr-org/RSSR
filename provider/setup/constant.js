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

// style
C.SCSS_PATH = path.resolve(process.cwd(), './src/setup/style');

// Development > open browser
C.OPEN_BROWSER_URL = 'http://localhost:' + process.env.PORT || 8000;

module.exports = C