// Say 0-5
// 0 = ALL
// 1 = TRACE
// 2 = INFO
// 3 = DEBUG
// 4 = WARN
// 5 = ERROR

const levels = {
    ALL: 0,
    TRACE: 1,
    DEBUG: 2,
    INFO: 3,
    WARN: 4,
    ERROR: 5
}

const debug_level = 0

function get_level(priority) {
    switch (priority) {
        case 0:
            return "ALL"
        case 1:
            return "TRACE"
        case 2:
            return "DEBUG"
        case 3:
            return "INFO"
        case 4:
            return "WARN"
        case 5:
            return "ERROR"
    }
}

function mydebug(priority, out) {
    if ( priority >= debug_level )
    {
        console.log(get_level(priority) + ": " + out)
    }
}

function mytrace() {
    if ( levels.TRACE >= debug_level )
    {
        var stackTrace = Error().stack
        var token = stackTrace.split("    at ")[2].replace(/(\r\n|\n|\r)/gm, "")
        // console.log(stackTrace)
        mydebug(levels.TRACE, token)
        // console.log("TRACE: " + token)
    }
}

function myeventlog(stream, event) {
    mydebug(levels.INFO, stream + ": " + JSON.stringify(event))
}

function myerrorlog(err) {
    mydebug(levels.ERROR, JSON.stringify(err))
}


module.exports = {
    mydebug,
    mytrace,
    myeventlog,
    myerrorlog
} 