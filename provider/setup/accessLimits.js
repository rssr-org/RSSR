const c = require('./constant');

// FOR PRODUCTION MODE
module.exports = function (app) {

    // ban access to stats.json and server.js
    const rgx = new RegExp(c.ROUTE_DIST + '/(stats.json|server.js)');
    app.use(rgx, function (req, res) {
        res.status(403).send('<h1>ERROR 403 - forbidden!</h1>');
    });

}
