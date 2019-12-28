const path = require('path');
const namespaceListPath = path.resolve('namespace.json')
const config = require(namespaceListPath);

let list = {};

function rebuildList() {
    list = {}

    config.namespace.forEach(function (item, index) {
        list[item] = '#' + config.prefix + item[0] + index
    })
}

module.exports = function (source) {
    source
        .slice(0, 150) // for improve transpile spead
        .replace(/@namespace "([^"]+)";/i, function (command, namespace) {
            if (list[namespace] === undefined)
                rebuildList();
            //
            source = source.slice(command.length); // remove @namespace
            source = '#{' + list[namespace] + '}{' + source + '}'; // add wrapper
        })
    return source;
};
