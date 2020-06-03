const Gelf = require('gelf');
const graylog = require('graylog-loging');

const GRAYLOGS_SERVER = 'logs.codelitt.dev';


const getGraylogsConfig = (log_host, log_env) => ({
  graylogPort: 12201,
  graylogHostname: GRAYLOGS_SERVER,
  connection: 'wan',
  maxChunkSizeWan: 1420,
  maxChunkSizeLan: 8154,
  environment: log_env,
  applicationName: log_host,
});

module.exports = (app, log_host, log_env) => {
  // stderr logging hook
  const graylogsConfig = getGraylogsConfig(log_host, log_env);
  const gelf = new Gelf(graylogsConfig)

  const log = (type, message) => {
    const message_config = {
      "host": log_host,
      "full_message": message,
      "short_message": message,
      "timestamp": Date.now() / 1000,
      "environment": log_env
    }

    gelf.emit(`gelf.${type}`, message_config)
  };

  const stderrWrite0 = process.stderr.write;
  process.stderr.write = (args) => { // On stderr write
    log('log', args); // Write to local error file
    args = Array.isArray(args) ? args : [args]; // Pass only as array to prevent internal TypeError for arguments
    return stderrWrite0.apply(process.stderr, args);
  };

  // stdout logging hook
  const stdoutWrite0 = process.stdout.write;
  process.stdout.write = (args) => { // On stdout write
    log('log', args); // Write to local log file
    args = Array.isArray(args) ? args : [args]; // Pass only as array to prevent internal TypeError for arguments
    return stdoutWrite0.apply(process.stdout, args);
  };

  // Setup graylog-loging - app requests
  graylog.init(graylogsConfig);
  app.use(graylog.logRequest);
}