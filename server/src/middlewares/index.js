const { CorsMiddleware } = require("./cors.middleware");
const { ErrroHandlerMiddleware, NotFoundMiddleWare } = require("./error.middleware")

module.exports = {
    CorsMiddleware, ErrroHandlerMiddleware, NotFoundMiddleWare
}