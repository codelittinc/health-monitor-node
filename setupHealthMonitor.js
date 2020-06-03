module.exports = (app, customVerifier) => {
  const defaultVerifier = (_, res) => {
    res.sendStatus(200)
  };

  const verifier = customVerifier || defaultVerifier;

  app.get('/health', verifier)
}