// limit request number
const rateLimit = require("express-rate-limit");

/**
 * rateLimit
 *
 * limit the request number of each user in windowMs
 * read more: https://www.npmjs.com/package/express-rate-limit
 *
 * @param app <object> : an express base of server [const app = expres()]
 */
module.exports = function (app) {
    app.enable("trust proxy");

    const limiter = rateLimit({
        windowMs: 60 * 1000, // 1 minutes
        max: 20 // 20 requests in each 1 minute
    });

    //  apply to all requests without loading static file (because defined in above)
    app.use(limiter);
}
