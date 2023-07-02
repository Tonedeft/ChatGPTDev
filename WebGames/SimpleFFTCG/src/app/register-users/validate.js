// Using validate.js library, but you can swap that out since
// this is the only file needing it (encapsulated all here)
const validate = require('validate.js')
const { mydebug, mytrace, myerrorlog } = require('../../mydebug')

const ValidationError = require('../errors/validation-error')

const constraints = {
    // TODO: Production environments should enforce stricter password rules
    email: {
        email: true,
        presence: true
    },
    password: {
        length: { minimum: 8 },
        presence: true
    }
}

// context contains: { attributes, traceId, messageStore, queries }
function v(context) {
    mytrace()
    const validationErrors = validate(context.attributes, constraints)

    if (validationErrors) {
        err = new ValidationError(validationErrors)
        myerrorlog("Error Validating User Registration", err)
        throw err
    }
}

module.exports = v