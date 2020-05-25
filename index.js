const graylog = require('graylog-loging');

module.exports = (expressApp, customVerifier) => {
  const { NODE_ENV } = process.env;
  const isProd = NODE_ENV == 'production';

  if (isProd) {
    console.log(`Health monitor up!`)
  } else {
    console.log(`Health monitor not running, if you want to run it set NODE_ENV=production`)
  }

  const configuration = {
    graylogPort: 12201,
    graylogHostname: 'logs.codelitt.dev',
    applicationName: 'Roadrunner'
  };

  graylog.init(configuration);

  const defaultVerifier = (_, res) => {
    res.sendStatus(200)
  };

  const verifier = customVerifier || defaultVerifier;

  expressApp.use(graylog.logRequest);
  expressApp.get('/health', verifier)
  expressApp.use(graylog.handleErrors);
}
