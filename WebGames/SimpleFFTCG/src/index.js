// This index.js is the server for the main page

const createExpressApp = require('./app/express')
const createConfig = require('./config')
const env = require('./env')
const { mydebug, mytrace } = require('./mydebug')

const config = createConfig({ env } )
const app = createExpressApp({ config, env })

// Start function will be called to start the system
function start () {
    mytrace()
    // call start() on each Aggregator
    config.aggregators.forEach(a => a.start())
    // call start() on each Component
    config.components.forEach(a => a.start())
    
    // listen on this port and handle with signalAppStart
    app.listen(env.port, signalAppStart)
}

function signalAppStart () {
    console.log(`${env.appName} started`)
    console.table([['Port', env.port], ['Environment', env.env]])
}

// export the express app, the config, and the start() function
module.exports = {
    app,
    config,
    start
}