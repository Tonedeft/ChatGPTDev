// Database Connections
const createKnexClient = require('./knex-client')
const createPostgresClient = require('./postgres-client')

// Message Store (Holder of Messages (Events and Commands))
const createMessageStore = require('./message-store')

// Applications (User Interaction)
const createHomeApp = require('./app/home')
const createRecordViewingsApp = require('./app/record-viewings')

// Aggregators (Data View Creation, Subscriber of Messages)
const createHomePageAggregator = require('./aggregators/home-page')

// My Utilities
const { mydebug, mytrace } = require('./mydebug')

// This is the main configure function
// for all of the microservices connections
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

    // Create the 'home' Aggregator
    const homePageAggregator = createHomePageAggregator({
        db: knexClient,
        messageStore
    })
    const aggregators = [
        homePageAggregator,
    ]
    const components = [

    ]


    return {
        env,
        // ...
        knexClient,
        messageStore,
        homeApp,
        recordViewingsApp,
        homePageAggregator,
        aggregators,
        components
    }
}

module.exports = createConfig