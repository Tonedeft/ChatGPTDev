const { mydebug, mytrace, myeventlog } = require('../mydebug')

const deserializeMessage = require('./deserialize-message')

// Use Eventide's get_last_stream_message() built-in db function
const getLastMessageSql = 'SELECT * FROM get_last_stream_message($1)'
const getCategoryMessagesSql = 'SELECT * FROM get_category_messages($1, $2, $3)'
const getStreamMessagesSql = 'SELECT * FROM get_stream_messages($1, $2, $3)'

function createRead({ db }) {
    mytrace()

    function read(streamName, fromPosition = 0, maxMessages = 1000) {
        mytrace()
        let query = null
        let values = []
        if (streamName.includes('-')) {
            // Entity streams have a dash
            query = getStreamMessagesSql
        } else {
            query = getCategoryMessagesSql
        }
        values = [streamName, fromPosition, maxMessages]

        return db.query(query, values)
            .then(res => res.rows.map(deserializeMessage))
    }

    function readLastMessage(streamName) {
        mytrace()
        return db.query(getLastMessageSql, [streamName])
            .then(res => deserializeMessage(res.rows[0]))
    }

    return {
        read,
        readLastMessage
    }
}

module.exports = createRead