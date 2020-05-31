const graylog = require('graylog-loging');

module.exports = (app, customVerifier) => {
  const { NODE_ENV, LOG_ENV, LOG_HOST  } = process.env;
  const isProd = NODE_ENV == 'production';

  if (isProd && (!LOG_ENV || !LOG_HOST)) {
    console.log('\x1b[31m%s\x1b[0m', 'Please set your LOG_ENV and LOG_HOST to start the health check system.')
    console.log('\x1b[31m%s\x1b[0m',`Your current LOG_ENV is ${LOG_ENV}`)
    console.log('\x1b[31m%s\x1b[0m',`Your current LOG_HOST is ${LOG_HOST}`)
    return;
  }

  if (isProd) {
    console.log('\x1b[32m%s\x1b[0m', 'Health monitor up!')
  } else {
    console.log('Health monitor not running, if you want to run it set NODE_ENV=production')
  }

  const configuration = {
    graylogPort: 12201,
    graylogHostname: 'logs.codelitt.dev',
    applicationName: LOG_HOST,
    environment: LOG_ENV
  };

  graylog.init(configuration);

  const defaultVerifier = (_, res) => {
    res.sendStatus(200)
  };

  const verifier = customVerifier || defaultVerifier;

  app.use(graylog.logRequest);
  app.get('/health', verifier)
  app.use(graylog.handleErrors);
}
