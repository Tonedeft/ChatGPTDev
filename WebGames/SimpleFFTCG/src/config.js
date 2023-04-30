const createKnexClient = require('./knex-client')
const createHomeApp = require('./app/home')
const createRecordViewingsApp = require('./app/record-viewings')
const { mydebug, mytrace } = require('./mydebug')

function createConfig ({ env }) {
    mytrace()
    
    // Set up the client connection to the backend
    // database using knex
    const db = createKnexClient({
        connectionString: env.databaseUrl
    })
    
    // Create the 'home' app with the database client
    const homeApp = createHomeApp({ db })

    const recordViewingsApp = createRecordViewingsApp({ db })

    return {
        env,
        // ...
        db,
        homeApp,
        recordViewingsApp
    }
}

module.exports = createConfig