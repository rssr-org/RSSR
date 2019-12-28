// load .env files and define environment varibale before all actions
require('../setup/evnLoader');
// define global.FILE_VERSION for dist file version. see render/Index.js template. ::5::
require('../setup/fileVersion');

const path = require('path')
const cookieParser = require('cookie-parser')
const seoOptimization = require('../setup/seoOptimization')
const rateLimit = require('../setup/rateLimit')
const express = require('express')
const serverRendererPath = path.resolve(process.cwd(), './dist/server.js')
const serverRenderer = require(serverRendererPath).default
const clientStatsPath = path.resolve(process.cwd(), './dist/stats.json')
const stats = require(clientStatsPath)
const {DIST_PATH, DIST_ROUTE, PUBLIC_PATH} = require('../setup/constant')



// express app
const app = express();

// cookie
app.use(cookieParser())

// make bundled final project source files accessable
app.use(DIST_ROUTE, express.static(DIST_PATH));

// load static files
app.use(express.static(PUBLIC_PATH));

// Redirect from www to non-www and remove slash at the end of URL
seoOptimization(app);

// limit the request number of each user in 'windowMs' milliseconds
rateLimit(app);

// load server script and render app (do react SSR)
app.use(serverRenderer(stats));





// run server
const
    PORT = process.env.PORT || 3000,
    HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, error => {
    if (error)
        return console.error('Error in server.production.js: ', error);
    else
        console.log(`production server running at http://localhost:${process.env.PORT}`);
});
