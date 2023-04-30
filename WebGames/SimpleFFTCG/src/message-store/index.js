const createWrite = require('./write')
const { mydebug, mytrace } = require('../mydebug')

function createMessageStore ({ db }) {
    mytrace()

    const write = createWrite({ db })
    return {
        write: write,
    }
}

module.exports = createMessageStore