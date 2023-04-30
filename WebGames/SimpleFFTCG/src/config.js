const createKnexClient = require('./knex-client')
const createPostgresClient = require('./postgres-client')
const createMessageStore = require('./message-store')
const createHomeApp = require('./app/home')
const createRecordViewingsApp = require('./app/record-viewings')
const { mydebug, mytrace } = require('./mydebug')

function createConfig ({ env }) {
    mytrace()
    
    // Set up the client connection to the backend
    // database using knex
    const knexClient = createKnexClient({
        connectionString: env.databaseUrl
    })
    const postgresClient = createPostgresClient({
        connectionString: env.messageStoreConnectionString
    })
    const messageStore = createMessageStore({ db: postgresClient })
    
    // Create the 'home' app with the database client
    const homeApp = createHomeApp({ db: knexClient })

    // Create the 'record-viewing' app with the messageStore
    const recordViewingsApp = createRecordViewingsApp({ messageStore })

    return {
        env,
        // ...
        db,
        messageStore,
        homeApp,
        recordViewingsApp
    }
}

module.exports = createConfig