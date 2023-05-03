const { mydebug, mytrace, myeventlog } = require('../mydebug')

function deserializeMessage(rawMessage) {
    mytrace()

    if (!rawMessage) {
        return null
    }

    return {
        id: rawMessage.id,
        streamName: rawMessage.stream_name,
        type: rawMessage.type,
        position: parseInt(rawMessage.position, 10),
        globalPosition: parseInt(rawMessage.globalPosition, 10),
        data: rawMessage.data ? JSON.parse(rawMessage.data) : {},
        metadata: rawMessage.metadata ? JSON.parse(rawMessage.metadata) : {},
        time: rawMessage.time
    }
}

module.exports = deserializeMessage