const Bluebird = require('bluebird')
const uuid = require('uuid/v4')

const category = require('./category')
const { mydebug, mytrace, myeventlog } = require('../mydebug')
const { myerrorlog } = require('../mydebug')

// takes as dependencies the 3 functions
// we'll use from the MessageStore to implement
// subscriptions
function configureCreateSubscription({ read, readLastMessage, write }) {
    mytrace()

    // IMPORTANT: each handler passed to this function
    //            MUST be idempotent
    return ({
        streamName, // the stream to subscribe to
        handlers,   // an object whose keys are message types and whose values
        // are functions for handling Events
        messagesPerTick = 100,
        subscriberId, // how subscribers identify themselves
        positionUpdateInterval = 100,
        originStreamName = null,
        tickIntervalMs = 100
    }) => {
        mytrace()

        // This creates a new stream that tracks the subscriber position
        // for this new subscriber.
        const subscriberStreamName = `subscriberPosition-${subscriberId}`

        let currentPosition = 0
        let messageSinceLastPositionWrite = 0
        let keepGoing = true

        function writePosition(position) {
            mytrace()
            const positionEvent = {
                id: uuid(),
                type: 'Read',
                data: { position }
            }

            myeventlog(subscriberStreamName, positionEvent)

            return write(subscriberStreamName, positionEvent)
        }

        // Update the position of the subscriber to "position"
        function updateReadPosition(position) {
            mytrace()
            currentPosition = position
            messagesSinceLastPositionWrite += 1

            // If we've processed at least "positionUpdateInterval" messages,
            // write our current position
            if (messagesSinceLastPositionWrite === positionUpdateInterval) {
                messageSinceLastPositionWrite = 0

                return writePosition(position)
            }

            return Bluebird.resolve(true)
        }

        function loadPosition() {
            mytrace()
            return readLastMessage(subscriberStreamName)
                .then(message => {
                    currentPosition = message ? message.data.position : 0
                })
        }

        function filterOnOriginMatch(messages) {
            mytrace()

            if (!originStreamName) {
                return messages
            }

            return messages.filter(message => {
                const originCategory =
                    message.metadata && category(message.metadata.originStreamName)

                return originStreamName === originCategory
            })
        }

        // This function will read _messagesPerTick_ messages
        // from the stream named _streamName_ starting from
        // _currentPosition_ + 1
        function getNextBatchOfMessages() {
            mytrace()
            return read(streamName, currentPosition + 1, messagesPerTick)
                .then(filterOnOriginMatch)
        }

        function handleMessage(message) {
            mytrace()
            myeventlog(message)

            // Get the handler function for the current message type
            // $any refers to a subscriber wanting to receive any message
            const handler = handlers[message.type] || handlers.$any

            // Call the handler function if one exists
            // Do nothing (Promise(true)) if there is no handler for this message
            return handler ? handler(message) : Promise.resolve(true)
        }

        // This is the function that processes the batch of messages
        function processBatch(messages) {
            mytrace()

            // For each message, handle it,
            // then update the subscription's read position,
            // and log an error if one occurs
            // then return the number of processed messages
            return Bluebird.each(messages, message =>
                handleMessage(message)
                    .then(() => updateReadPosition(message.globalPosition))
                    .catch(err => {
                        logError(message, err)
                        myerrorlog(err, message)

                        throw err
                    })
            )
                .then(() => messages.length)
        }

        // tick() will get the next batch of messages and process them
        function tick() {
            mytrace()
            return getNextBatchOfMessages()
                .then(processBatch)
                .catch(err => {
                    mydebug(5, `Error Received, STOPPING SUBSCRIPTION ${subscriberId}`)
                    myerrorlog(err)

                    stop()
                })
        }

        // Asynchronous function that regularly polls for more messages
        async function poll() {
            mytrace()
            // call loadPosition() and wait for it to return
            // so we know starting location
            await loadPosition()

            // eslint-disable-next-line no-unmodified-loop-condition
            while (keepGoing) {
                // call tick() and wait for it to return
                const messagesProcessed = await tick()

                // if we processed any messages, wait tickIntervalMs milliseconds
                if (messagesProcessed === 0) {
                    // this "await" gives up the thread, so we don't block
                    await Bluebird.delay(tickIntervalMs)
                }
            }
        }

        // Function for subscribers to call to start the subscription
        function start() {
            mydebug(3, `Started ${subscriberId}`)

            return poll()
        }

        function stop() {
            mydebug(3, `Stopped ${subscriberId}`)

            keepGoing = false
        }

        return {
            loadPosition,
            start,
            stop,
            tick,
            writePosition
        }
    }

}

module.exports = configureCreateSubscription