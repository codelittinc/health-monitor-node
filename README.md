How to use:

```
import withHealthMonitor from 'health-monitor-node'

// option 1
withHealthMonitor(expressApp);

// option 2
withHealthMonitor(expressApp, (req, res) => {
  // load something from the database to test the connection, execute a GraphQL query, or anything you want to verify;

  req.sendStatus(200)
});
```