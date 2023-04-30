// This file is required by mount-middleware.js
// and defines a specific middleware function
// for processing incoming requests

// Unique identifier functionality
const uuid = require('uuid/v4')

// Standard middleware signature
// This sets the context of an incoming request
function primeRequestContext (req, res, next) {
    req.context = {
        traceId: uuid()
    }

    // call next middleware
    next()
}

// export the middleware function
module.exports = primeRequestContext