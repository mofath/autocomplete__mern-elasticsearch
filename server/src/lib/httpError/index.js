const { HttpStatusCode } = require("../../constant/error.constants");

class HttpError extends Error {
    constructor(status = 500, name = "Internal server error", message = "Something went wrong", stack = "") {
        super(name, message, stack);
        this.status = status;
    }
}

class Error404 extends HttpError {
    constructor(stack = "", message = "") {
        const { name, statusCode } = HttpStatusCode.NOT_FOUND;
        super(statusCode, name, message, stack);
    }
}

class Error500 extends HttpError {
    constructor(stack = "", message = "") {
        const { name, statusCode } = HttpStatusCode.INTERNAL_SERVER_ERROR;
        super(statusCode, name, message, stack);
    }
}


module.exports = {
    HttpError,
    Error404,
    Error500,
};
