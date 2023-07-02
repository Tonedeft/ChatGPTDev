const { mydebug, mytrace, myerrorlog } = require('../../mydebug')

const ValidationError = require('../errors/validation-error')

// context contains: { attributes, traceId, messageStore, queries }
function v(context) {
    mytrace()

    // if "load-existing-identity.js" found an existing email
    // in the database, it would have placed it in "existingIdentity"
    // in the context.
    if (context.existingIdentity) {
        err = new ValidationError({ email: ['already taken'] })
        myerrorlog(err)
        throw err
    }

    return context
}

module.exports = v