// load .env files and define environment varibale before all actions
require('../setup/evnLoader');
// define global.FILE_VERSION for dist file version. see render/Index.js template. ::5::
require('../setup/fileVersion');

const open = require('open')
const cookieParser = require('cookie-parser')
const express = require('express')
const webpack = require('webpack')
const config = require('../webpack/development')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const devServerIsReady = require('../setup/devServerIsReady')
const {DIST_ROUTE, PUBLIC_PATH} = require('../setup/constant')





// express app
const app = express();

// cookie
app.use(cookieParser())

// create webpack compiler
const compiler = webpack(config);

// make bundled project source files accessable from memory
app.use(webpackDevMiddleware(compiler, {
    serverSideRender: true,
    publicPath: DIST_ROUTE
}));

// static files
app.use(express.static(PUBLIC_PATH));

// recompile webpack when file changes
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));

// hot update Webpack bundles on the server
app.use(webpackHotServerMiddleware(compiler));





// run server
const PORT = process.env.PORT || 4000;

app.listen(PORT, error => {
    if (error) {
        return console.error('Error in server.development.js: ', error);
    } else {
        // wait to project built and app ready
        devServerIsReady(PORT)
            .then(function () {
                // open project in browser
                open(`http://localhost:${PORT}`);

                console.log(`development server running at http://localhost:${process.env.PORT}`);
            })
    }
});
