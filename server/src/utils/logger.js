const winston = require('winston');
const configuration = require('./config')

const logger = winston.createLogger({
    level: configuration.logger.level,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
    ]
});

module.exports = logger;
