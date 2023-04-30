const { mydebug, mytrace } = require('../mydebug')

// Aggregators handle messages, so create Handlers
function createHandlers ({ queries }) {
    mytrace()
    return {
        // Return function that takes an Event and returns a
        // function that calls incrementVideosWatched for that
        // Event's globalPosition
        VideoViewed: event => queries.incrementVideosWatched(event.globalPosition)
    }
}

// Aggregators interact with a database, so create Queries
function createQueries ({ db }) {
    mytrace()

    function incrementVideosWatched (globalPosition) {
        mytrace()
        // UPDATE the pages table
        // SET the videosWatched property to existing videosWatched (treated as int) + 1
        // also SETs lastViewProcessed of the result of previous SET to
        // the globalPosition value
        // only UPDATE rows WHERE the page_name is 'home'
        // and the lastViewProcessed is before globalPosition

        // Note the last line in the query provides idempotence,
        // as duplicate events received will not process twice because
        // the lastViewProcessed will match and the WHERE part of
        // the query will not pull any rows.
        const queryString = `
            UPDATE
                pages
            SET
                page_data = jsonb_set(
                    jsonb_set(
                        page_data,
                        '${videosWatched}',
                        ((page_data ->> 'videosWatched')::int + 1)::text::jsonb
                    ),
                    '{lastViewProcessed}',
                    :globalPosition::text::jsonb
                )
            WHERE
                page_name = 'home' AND
                (page_data->>'lastViewProcessed')::int < :globalPosition
            `
        return db.then(client => client.raw(queryString, { globalPosition }))
    }

    // This function will add a 'home' row to the pages table
    // if one doesn't exist already
    function ensureHomePage () {
        mytrace()

        const initialData = {
            pageData: { lastViewProcessed: 0, videosWatched: 0 }
        }

        const queryString = `
            INSERT INTO
                pages(page_name, page_data)
            VALUES
                ('home', :pageData)
            ON CONFLICT DO NOTHING
        `

        return db.then(client => client.raw(queryString, initialData))
    }

    return {
        incrementVideosWatched,
        ensureHomePage
    }
}

function build ({ db, messageStore }) {
    mytrace()
    const queries = createQueries({ db })
    const handlers = createHandlers({ queries })
    const subscription = messageStore.createSubscription({
        streamName: 'viewing',
        handlers,
        subscriberId: 'aggregators:home-page'
    })

    function init () {
        mytrace()
        // We have to make sure the row exists that contains 'home'
        return queries.ensureHomePage()
    }

    function start () {
        mytrace()
        init().then(subscription.start)
    }

    return {
        queries,
        handlers,
        init,
        start
    }
}

module.exports = build