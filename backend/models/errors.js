class httpError extends Error {
    constructor(message,errorcode){
        super(message), //adding message property by calling parents constructor
        this.code= errorcode //adding an error code
    }
}

module.exports= httpError