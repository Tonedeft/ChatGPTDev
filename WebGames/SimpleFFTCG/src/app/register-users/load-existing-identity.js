const { mydebug, mytrace, myerrorlog } = require('../../mydebug')

// context contains: { attributes, traceId, messageStore, queries }
function v(context) {
    mytrace()

    // This just looks for an existing email in the
    // database and attaches it to the context
    return context.queries
        .byEmail(context.attributes.email)
        .then(existingIdentity => {
            context.existingIdentity = existingIdentity

            return context
        })
}

module.exports = v