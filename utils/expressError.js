 module.exports = class expressError extends Error{
    constructor(statusCode , msg){
        super(msg);
        this.statusCode = statusCode;
        this.message = msg;
    }
}