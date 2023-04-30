// This file sets up the express framework for the app that
// user's will interact with.

const express = require('express')
const { join } = require('path')

const mountMiddleware = require('./mount-middleware')
const mountRoutes = require('./mount-routes')
const { mydebug, mytrace } = require('../../mydebug')

function createExpressApp ({ config, env }) {
    mytrace()
    
    const app = express()

    // Configure PUG
    app.set('views', join(__dirname, '..'))
    app.set('view engine', 'pug')

    mountMiddleware(app, env)
    mountRoutes(app, config)

    return app
}

module.exports = createExpressApp