
Set the environment variables for your project:

LOG_ENV=dev|qa|prod

LOG_HOST=<YOUR HOST URL>

```
import withHealthMonitor from '@codelittinc/health-monitor-node'

// option 1
withHealthMonitor(app);

// option 2
withHealthMonitor(app, (req, res) => {
  try {
    // load something from the database to test the connection, execute a GraphQL query, or anything you want to verify;
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```