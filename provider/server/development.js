// load .env files and define environment varibale before all actions
require('rssr-env-loader')
// define global.FILE_VERSION for dist file version. see render/Index.js template. ::5::
require('../setup/fileVersion')

const cookieParser = require('cookie-parser')
const express = require('express')
const webpack = require('webpack')
const config = require('../webpack/development')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const {DIST_ROUTE, PUBLIC_NAME} = require('../setup/constant')





// express app
const app = express()

// cookie
app.use(cookieParser())

// static files
app.use(express.static(PUBLIC_NAME))

// create webpack compiler
const compiler = webpack(config)

// make bundled project source files accessable from memory
app.use(webpackDevMiddleware(compiler, {
    publicPath: DIST_ROUTE,
    serverSideRender: true
}))

// recompile webpack when file changes
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')))

// hot update Webpack bundles on the server
app.use(webpackHotServerMiddleware(compiler))





// run server
const PORT = process.env.PORT || 4000;

app.listen(PORT, error => {
    if (error) {
        return console.error('Error in server.development.js: ', error);
    } else {
        console.log(`development server running at http://localhost:${process.env.PORT}`);
    }
})
