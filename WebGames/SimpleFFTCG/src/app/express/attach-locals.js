// This file is required by mount-middleware.js
// and defines a specific middleware function
// for processing incoming requests

// Standard middleware signature
// This copies the request context (set in primeRequestContext) to the response
function attachLocals (req, res, next) {
    // Copy the context from request to response
    res.locals.context = req.context

    // call next middleware
    next()
}

// export the middleware function
module.exports = attachLocals