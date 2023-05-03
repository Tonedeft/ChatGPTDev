const createWrite = require('./write')
const createRead = require('./read')

const { mydebug, mytrace } = require('../mydebug')
const configureCreateSubscription = require('./subscribe')

function createMessageStore ({ db }) {
    mytrace()

    const write = createWrite({ db })
    const read = createRead({ db })
    const createSubscription = configureCreateSubscription({
        read: read.read,
        readLastMessage: read.readLastMessage,
        write: write
    })
    return {
        createSubscription,
        write: write,
        read: read.read,
        readLastMessage: read.readLastMessage
    }
}

module.exports = createMessageStore