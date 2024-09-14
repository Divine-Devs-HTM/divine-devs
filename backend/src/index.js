import app from './app.js';
import connectToMongoDB from './connectToMongoDB.js';

const port = process.env.PORT || 9000;

async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(port, () => {
      /* eslint-disable no-console */
      console.log(`Listening: http://localhost:${port}`);
      /* eslint-enable no-console */
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
