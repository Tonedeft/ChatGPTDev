// This file is required by mount-middleware.js
// and defines a specific middleware function
// for processing incoming requests

// Error-handling middleware signature
// This is an error handler that catches anything not caught earlier
function lastResortErrorHandler (err, req, res, next) {
    // Get the ID of the error triggering the error
    const traceId = req.context ? req.context.traceId : 'none'

    // Log to console
    console.error(traceId, err)

    // Respond with error code 500
    res.status(500).send('error')

    // no call to next() in this case, we won't continue
}

// export the middleware function
module.exports = lastResortErrorHandler