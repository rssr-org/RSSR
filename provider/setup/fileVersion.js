
// define global.FILE_VERSION for dist file version. see render/Index.js template.
// global.FILE_VERSION  is 'npm' or 'random' or 'disable'
switch (process.env.FILE_VERSION_TYPE) {
    case 'npm':
        // define global.FILE_VERSION for dist file version. see render/Index.js template.
        const npmVersion = require("../../package").version;
        // value of npm package.js verion property
        global.FILE_VERSION = '?v=' + npmVersion;
        break;
    case 'time':
        // time stamp of now
        const timeStampVersion = new Date().getTime();
        // random 24 char string
        global.FILE_VERSION = '?v=' + timeStampVersion;
        break;
    case 'disable':
        // without version
        global.FILE_VERSION = '';
        break;
    default:
        console.error('process.env.FILE_VERSION is not valid!',  global.FILE_VERSION)
}
