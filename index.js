const setupHealthMonitor = require('./setupHealthMonitor.js');
const setupLogger = require('./setupLogger.js');

module.exports = (app, customVerifier) => {
  const { NODE_ENV, LOG_ENV, LOG_HOST, LOG_TRACK_INFO } = process.env;
  const isDev = NODE_ENV == 'dev';
  if (isDev) return;

  const isProd = NODE_ENV == 'production';

  if (isProd && (!LOG_ENV || !LOG_HOST)) {
    console.log('\x1b[31m%s\x1b[0m', 'Please set your LOG_ENV and LOG_HOST to start the health check system.')
    console.log('\x1b[31m%s\x1b[0m', `Your current LOG_ENV is ${LOG_ENV}`)
    console.log('\x1b[31m%s\x1b[0m', `Your current LOG_HOST is ${LOG_HOST}`)
    return;
  }

  if (isProd) {
    console.log('\x1b[32m%s\x1b[0m', 'Health monitor up!')
  } else {
    console.log('Health monitor not running, if you want to run it set NODE_ENV=production')
  }

  setupLogger(app, LOG_HOST, LOG_ENV, LOG_TRACK_INFO)
  setupHealthMonitor(app, customVerifier)
}
