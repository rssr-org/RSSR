// load environment varibale of .env file
const dotenv = require('dotenv')
dotenv.config()

// load  environment varibale of .env.[NODE_ENV] files
const fs = require('fs')
const envPath = fs.readFileSync('.env.' + process.env.NODE_ENV);
const envConfig = dotenv.parse(envPath)
for (const k in envConfig) {
    process.env[k] = envConfig[k]
}