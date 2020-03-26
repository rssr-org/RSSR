/**
 * log axios errors to console
 */
export const errorLogger = (title, error, ignoreMessage, req) => {
    // get uesr IP if exists 
    let ip = '', url = '';
    if (req !== undefined) {
        url = req.originalUrl;

        ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (typeof ip === 'string')
            ip = ip.split(',')[0];
    }

    let errorMessage, type;
    if (error.response) {
        // errorMessage = error.response.data; // commented for clean console
        errorMessage = ''
        type = "RES";// response error - server finds error and returns a status like 402 to front
    } else if (error.request) {
        errorMessage = error.message;
        type = "REQ"; // request error - like error 500 or request timeouted
    } else if (error.message) {
        errorMessage = error.stack || error.message || JSON.stringify(error).slice(0, 600);
        type = "STP"; // setup error - have error in code like one variable is undefined
    } else {
        errorMessage = JSON.stringify(error).slice(0, 600);
        type = "PUB"; // public error - other errors
    }

    console.error(`${title} ${type} ${ip} ${url}`);

    if (errorMessage && !ignoreMessage)
        console.error('\t' + errorMessage);
}
