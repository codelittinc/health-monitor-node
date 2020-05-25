const graylog = require('graylog-loging');

module.exports = (expressApp, customVerifier) => {
  graylog.init({
    graylogPort: 12201,
    graylogHostname: 'logs.codelitt.dev'
  });

  const defaultVerifier = (_, res) => {
    res.sendStatus(200)
  };
  const verifier = customVerifier || defaultVerifier;

  expressApp.use(graylog.logRequest);
  expressApp.get('/health', verifier)
  expressApp.use(graylog.handleErrors);
}
