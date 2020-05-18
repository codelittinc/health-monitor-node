const graylog = require('graylog-loging');

module.exports = (expressApp, customVerifier) => {
  graylog.init({
    graylogPort: 12201,
    graylogHostname: '64.227.27.179'
  });

  const defaultVerifier = (_, res) => {
    res.sendStatus(200)
  };
  const verifier = customVerifier || defaultVerifier;

  expressApp.use(graylog.logRequest);
  expressApp.get('/health', verifier)
  expressApp.use(graylog.handleErrors);
}