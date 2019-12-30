const path = require('path');
const namespaceFile = path.resolve('namespace.json')
const packageFile = path.resolve('package.json')
const defaultConfig = require("./config.default");


let config;
try {
    config = require(namespaceFile);
} catch (e) {
    try {
        config = require(packageFile).namespace;
    } catch (e) {
        config = {}
    }
}
config = {
    ...defaultConfig,
    ...config
}


module.exports = function (source) {
    source
        .slice(0, 150) // for improve transpile spead
        .replace(/@namespace "([^"]+)";/i, function (command, namespace) {
            source = source.slice(command.length); // remove @namespace
            source = '[' + config.name + '=' + namespace + ']{' + source + '}'; // add wrapper
        })
    return source;
}
