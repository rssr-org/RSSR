/**
 * envLoader is customed version of dotenv package
 * https://www.npmjs.com/package/dotenv
 */
const
    fs = require('fs'),
    path = require('path');

/**
 * Parses a string or buffer into an object
 * @param {(string|Buffer)} src - source to be parsed
 * @returns {Object} keys and values from src
 */
function parse(src) {
    const obj = {}

    // convert Buffers before splitting into lines and processing
    src.toString().split('\n').forEach(function (line) {
        // matching "KEY' and 'VAL' in 'KEY=VAL'
        const keyValueArr = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
        // matched?
        if (keyValueArr != null) {
            const key = keyValueArr[1]

            // default undefined or missing values to empty string
            let value = keyValueArr[2] || ''

            // expand newlines in quoted values
            const len = value ? value.length : 0
            if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
                value = value.replace(/\\n/gm, '\n')
            }

            // remove any surrounding quotes and extra spaces
            value = value.replace(/(^['"]|['"]$)/g, '').trim()

            obj[key] = value
        }
    })

    return obj
}

/*
 * Main entry point into dotenv. Allows configuration before loading .env
 * @param {Object} options - options for parsing .env file
 * @param {string} [options.path=.env] - path to .env file
 * @param {string} [options.encoding=utf8] - encoding of .env file
 * @returns {Object} parsed object or error
*/
function config(options) {
    const dotenvPath = options.path;

    try {
        // specifying
        const parsed = parse(fs.readFileSync(dotenvPath))

        Object.keys(parsed).forEach(function (key) {
            process.env[key] = parsed[key];
        })

        return {parsed}
    } catch (err) {
        console.error(err);
    }
}


/**
 * load env files and define environment varibale
 * use NODE_ENV to define environment in run script
 *
 * NODE_ENV=
 *  production --> .env.development
 *  development --> .env.production
 *  test --> .env.test
 *
 * exp: NODE_ENV=development node devScript.js
 *
 * NOTICE: .env load in all environment
 */
const ROOT = process.cwd();
let selectedEnv = null;

switch (process.env.NODE_ENV) {
    case 'development':
        selectedEnv = path.resolve(ROOT, '.env.development');
        break;
    case 'production':
        selectedEnv = path.resolve(ROOT, '.env.production');
        break;
    case 'test':
        selectedEnv = path.resolve(ROOT, '.env.test');
        break;
}

// load .env
config({path: path.resolve(ROOT, '.env')});

// load selected environment
config({path: selectedEnv});
