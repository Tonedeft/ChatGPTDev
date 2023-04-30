const express = require('express')
const { mydebug, mytrace } = require('../../mydebug')

// actions will perform the business logic
function createActions ({
    db
}) {
    mytrace()

    function recordViewing (traceId, videoId) {
        mytrace()

        // Return something Promise-based so that the endpoint doesn't crash
        return Promise.resolve(true)
    }
    return {
        recordViewing
    }
}

// handlers handle the requests and use the business logic "actions"
function createHandlers ({ actions }) {
    mytrace()

    // Standard handler takes request and response as input
    function handleRecordViewing( req, res ) {
        mytrace()
        // perform the recordViewing action for the
        // current traceId and specified videoId
        // then redirect back to the home page
        return actions.recordViewing(req.context.traceId, req.params.videoId)
            .then(() => res.redirect('/'))
    }

    return {
        handleRecordViewing
    }
} 

function createRecordViewings ({
    db
}) {
    mytrace()
    const actions = createActions({
        db
    })

    const handlers = createHandlers({ actions })

    const router = express.Router()

    // This route will map whatever is after the / to 'req.params.videoId'
    router.route('/:videoId').post(handlers.handleRecordViewing)

    return { actions, handlers, router }
}

module.exports = createRecordViewings