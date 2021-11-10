class InputRequire extends Error{
    constructor(){
        super()
    }
}
class Duplicate extends Error{
    constructor(){
        super()
    }
}
class IncorrectCredentials extends Error{
    constructor(){
        super()
    }
}
class ConnectionError extends Error{
    constructor(){
        super()
    }
}
module.exports = {
    InputRequire,
    Duplicate,
    IncorrectCredentials,
    ConnectionError
}