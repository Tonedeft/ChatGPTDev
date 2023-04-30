// Basically makes a table that houses keypairs
// For example: the home page might have a row containing
//   page_name='home'
//   page_data='{"videosWatched":42,"lastViewProcessed":24}
exports.up = knex =>
    knex.schema.createTable('pages', table => {
        table.string('page_name').primary()
        table.jsonb('page_data').defaultsTo('{}')
    })

exports.down = knex => knex.schema.dropTable('pages')