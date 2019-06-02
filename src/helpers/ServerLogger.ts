import winston, { format, transports } from 'winston';
import PlaceholderReplacer from './PlaceholderReplacer';
import config from '../../config/config.json';

const { combine, timestamp, label, printf } = format;

const logLevels = {
    levels: {
        emerg: 0,
        alert: 1,
        crit: 2,
        error: 3,
        warning: 4,
        notice: 5,
        info: 6,
        debug: 7
    },
    colors: {
        emerg: 'underline black redBG dim',
        alert: 'black redBG',
        crit: 'underline black redBG',
        error: 'red',
        warning: 'yellow',
        notice: 'blue',
        info: 'white',
        debug: 'cyanBG black'
    }
};

export default (scope: string = "SERVER") => {

    const formatConsole = combine(
        winston.format.colorize({ all: true }),
        label({ label: scope }),
        timestamp(),
        printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${label}] ${level.toUpperCase()}: ${message}`;
        })
    );

    // no change yet
    const formatFile = formatConsole;

    // create the logger
    const logger: winston.Logger = winston.createLogger({
        levels: logLevels.levels,
        format: formatConsole,
        transports: [
            new winston.transports.Console({ format: formatConsole }),
            new winston.transports.File(
                { 
                    format: formatFile,
                    filename: PlaceholderReplacer(config.logging.server) 
                }
            )
        ]
    });

    winston.addColors(logLevels.colors);


    return logger;

};