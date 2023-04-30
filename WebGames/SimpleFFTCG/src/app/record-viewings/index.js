const express = require('express')
const uuid = require('uuid/v4')
const { mydebug, mytrace, myeventlog } = require('../../mydebug')

// actions will perform the business logic
function createActions ({
    messageStore
}) {
    mytrace()

    // This function will record a VideoViewed Event to the viewing-<ID> stream
    function recordViewing (traceId, videoId, userId) {
        mytrace()

        const viewedEvent = {
            id: uuid(),
            type: 'VideoViewed',
            metadata: {
                traceId,
                userId,
            },
            data: {
                userId,
                videoId
            }
        }
        const streamName = `viewing-${videoId}`

        myeventlog(streamName, viewedEvent)

        // Return something Promise-based so that the endpoint doesn't crash
        return messageStore.write(streamName, viewedEvent)
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
    messageStore
}) {
    mytrace()
    const actions = createActions({
        messageStore
    })

    const handlers = createHandlers({ actions })

    const router = express.Router()

    // This route will map whatever is after the / to 'req.params.videoId'
    router.route('/:videoId').post(handlers.handleRecordViewing)

    return { actions, handlers, router }
}

module.exports = createRecordViewings