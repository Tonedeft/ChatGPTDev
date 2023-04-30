const Bluebird = require('bluebird')
const pg = require('pg')
const { mydebug, mytrace } = require('./mydebug')

function createDatabase ({ connectionString }) {
    mytrace()

    // Instantiate database connection to Postgres
    const client = new pg.Client({ connectionString, Promise: Bluebird })

    let connectedClient = null
    
    function connect () {
        mytrace()

        if (!connectedClient) {
            // Require it to use the message_store schema
            connectedClient = client.connect()
                .then(() => client.query('SET search_path = message_store, public'))
                .then(() => client)
        }

        return connectedClient
    }

    function query (sql, values = []) {
        mytrace()

        return connect()
            .then(client => client.query(sql, values))
    }

    return {
        query,
        // stop function is used in testing to terminate a process
        stop: () => client.end()
    }
}

module.exports = createDatabase