// load .env files and define environment varibale before all actions
require('rssr-env-loader')
// define global.FILE_VERSION for dist file version. see render/Index.js template. ::5::
require('../setup/fileVersion')

const {DIST_PATH, DIST_ROUTE, PUBLIC_NAME, SERVER_DIST_PATH} = require('../setup/constant')
const cookieParser = require('cookie-parser')
const seoOptimization = require('rssr-seo-optimization')
const rateLimit = require('../setup/rateLimit')
const express = require('express')
const serverRenderer = require(SERVER_DIST_PATH).default





// express app
const app = express()

// cookie
app.use(cookieParser())

// make bundled final project source files accessable
app.use(DIST_ROUTE, express.static(DIST_PATH))

// load static files
app.use(express.static(PUBLIC_NAME))

// Redirect from www to non-www and remove slash at the end of URL
seoOptimization(app)

// limit the request number of each user in 'windowMs' milliseconds
rateLimit(app)

// load server script and render app (do react SSR)
app.use(serverRenderer())





// run server
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'

app.listen(PORT, HOST, error => {
    if (error)
        return console.error('Error in server.production.js: ', error);
    else
        console.log(`production server running at http://localhost:${process.env.PORT}`);
})
