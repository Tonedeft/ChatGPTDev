// This file is required by index.js and defines a function
// that tells the app which middleware it will be using
// We are using 3 middleware functions to be included from
// separate files

const express = require('express')
const { join } = require('path')

// Include the 3 middleware functions we are using
const attachLocals = require('./attach-locals')
const lastResortErrorHandler = require('./last-resort-error-handler')
const primeRequestContext = require('./prime-request-context')

function mountMiddleware (app, env) {

    // Tell app to use our 3 custom middlewares
    app.use(lastResortErrorHandler)
    app.use(primeRequestContext)
    app.use(attachLocals)

    // Tell app to use a static file server located at ./../public
    app.use(express.static(join(__dirname, '..', 'public'), { maxAge: 86400000 }))
}

// export mountMiddleware so it can be used outside
module.exports = mountMiddleware