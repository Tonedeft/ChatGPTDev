const Bluebird = require('bluebird')
const knex = require('knex')
const { mydebug, mytrace } = require('./mydebug')

function createKnexClient ({ connectionString, migrationsTableName }) {
    mytrace()

    // Create knex instance
    const client = knex(connectionString)

    // Set up migration options
    const migrationOptions = {
        tableName: migrationsTableName || 'knex_migrations'
    }
    mydebug(3, "Connecting to migrations table: " + migrationOptions.tableName)

    // Run the migrations
    // Wrap in Bluebird.resolve to guarantee a Bluebird Promise down the chain
    return Bluebird.resolve(client.migrate.latest(migrationOptions))
        .then(() => client)
}

module.exports = createKnexClient