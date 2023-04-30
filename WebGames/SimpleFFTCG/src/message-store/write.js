const VersionConflictError = require('./version-conflict-error')
const { mydebug, mytrace, myeventlog, myerrorlog } = require('../mydebug')

// Template for the write_message() function on the message-db database
const writeFunctionSql = 'SELECT message_store.write_message($1, $2, $3, $4, $5, $6)'

const versionConflictErrorRegex = /^Wrong.*Stream Version: (\d+)\)/

// createWrite returns a function that takes 3 parameters,
// the streamName, the message, and the expectedVersion
function createWrite ({ db }) {
    mytrace()

    return (streamName, message, expectedVersion) => {
        mytrace()

        // Error if there is no type
        if (!message.type) {
            mydebug(5, "Message Logged to MessageStore does not have type")
            throw new Error('Messages must have a type')
        }

        myeventlog(streamName, message)

        // values to put in the writeFunctionSql template
        const values = [
            message.id,     // $1
            streamName,     // $2
            message.type,   // $3
            message.data,   // ...
            message.metadata,
            expectedVersion
        ]

        // Perform the database query and return the result
        return db.query(writeFunctionSql, values)
            .catch(err => {
                mydebug(5, "Caught Error Querying MessageStore")

                const errorMatch = err.message.match(versionConflictErrorRegex)
                const notVersionConflict = errorMatch === null;

                if ( notVersionConflict ) {
                    throw err
                }

                const actualVersion = parseInt(errorMatch[1], 10)

                const versionConflictError = new VersionConflictError(
                    streamName,
                    actualVersion,
                    expectedVersion
                )
                versionConflictError.stack = err.stack
                myerrorlog(versionConflictError)

                throw versionConflictError
            })
    }
}

module.exports = createWrite