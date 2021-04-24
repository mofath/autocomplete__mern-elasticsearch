const path = require("path");
const winston = require("winston");
const config = require("../../config")
const { createLogger, transports, format: { combine, timestamp, colorize, align, printf, json, label } } = winston;

const logPath = path.join(__dirname, "../../logs");

winston.addColors(config.logger.logLevels);

module.exports = (filename) => {
  const logFormat = printf((info) => {
    const { timestamp, level, message, label, ...args } = info;
    const ts = timestamp.slice(0, 19).replace("T", " ");
    return `${ts} [${label}] [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args) : ""}`;
  });

  const options = {
    console: {
      handleExceptions: true,
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
      format: combine(
        colorize(),
        align(),
        json(),
        label({ label: (/src(.+)/.exec(filename)[1]) }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
      ),
    },
    access: {
      filename: path.join(logPath, "access.log"),
      level: "info",
      format: combine(
        align(),
        json(),
        label({ label: (/src(.+)/.exec(filename)[1]) }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
      ),
    },
    error: {
      filename: path.join(logPath, "errors.log"),
      level: "error",
      format: combine(
        align(),
        json(),
        label({ label: (/src(.+)/.exec(filename)[1]) }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
      ),
    },
  };

  return {
    errorLogger: createLogger({
      transports: [
        new transports.File(options.error),
        new transports.Console(options.console),
      ],
    }),
    accessLogger: createLogger({
      transports: [
        new transports.File(options.access),
        new transports.Console(options.console),
      ],
    }),
  }
};