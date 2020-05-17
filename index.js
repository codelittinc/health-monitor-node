module.exports = (expressApp, customVerifier) => {
  const defaultVerifier = (_, res) => {
    res.sendStatus(200)
  };
  const verifier = customVerifier || defaultVerifier;

  expressApp.get('/health', verifier)
}