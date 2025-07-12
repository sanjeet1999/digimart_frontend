import pino from "pino";
import pinoCaller from "pino-caller";

let logger;

// const environment = process.env.NODE_ENV;
const environment = "development";
// console.log("environment",environment);
// const environment = "production";
let level;
if (environment === 'development') {
  level = "debug"
}
else{
  level = "info"
}


const pinoInstance = pino({
  level: level,
  transport: {
    targets: [
      {
        // Target 1: Pretty, colored logs to the console
        target: 'pino-pretty',
        level: level,
        options: {
          colorize: true,
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
          messageFormat: '{msg}'

        },
      },
      {
        // Target 2: Pretty, non-colored logs to a file
        target: 'pino-pretty',
        level: level,
        options: {
          colorize: false,
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
          messageFormat: '{msg}',
          destination: 'app.log',
          mkdir: true, // Create the file if it does not exist
        },
      },
    ],
  },
});
logger = pinoCaller(pinoInstance);

export default logger;