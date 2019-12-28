'use strict';
const http = require('http');

// dev Server Is Ready
module.exports = function (port) {
    return new Promise(resolve => {
        const retry = () => setTimeout(main, 200);

        const main = () => {
            const request = http.request({method: 'GET', port: port}, response => {
                if (response)
                    return resolve();

                retry();
            });

            request.on('error', retry);
            request.end();
        };

        main();
    });
};
