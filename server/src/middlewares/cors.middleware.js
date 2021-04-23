const { accessLogger } = require("../lib/logger")(__filename)

exports.CorsMiddleware = (req, res, next) => {
    accessLogger.info(`NEW REQUEST ${req.ip}`);
    accessLogger.info(`${req.method} ${req.url}`);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
        return res.status(200).json({});
    }
    next();
};