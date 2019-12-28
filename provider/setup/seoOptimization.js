const parseURL = require('url').parse;

/**
 * SEO optimization
 *
 * Redirect domains starting with www to non-www
 * and remove slash at the end of URL for improve SEO
 *
 * @param app <object> : an express base of server [const app = expres()]
 */
module.exports = function (app) {
    app.get('/*', function (req, res, next) {
        const
            protocol = req.protocol + '://',
            urlParam = parseURL(req.url),
            search = urlParam.search || '';

        let
            host = req.headers.host,
            doRedirect = false,
            pathname = urlParam.pathname;

        const
            WWWExist = req.headers.host.match(/^www\./) !== null,
            slashExist = pathname.charAt(pathname.length - 1) === '/' && pathname !== '/';

        // remove www
        if (WWWExist) {
            host = req.headers.host.replace(/^www\./, '');
            doRedirect = true;
        }

        // remove slash
        if (slashExist) {
            pathname = pathname.slice(0, -1);
            doRedirect = true;
        }

        // redirect to truest url
        if (doRedirect) {
            res.redirect(301, protocol + host + pathname + search);
        } else {
            return next();
        }
    });
}