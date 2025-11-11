import app from './app.js';
import { connectDB } from './db.js';
import { config } from './config.js';

(async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`🚀 Backend running on http://localhost:${config.port}`);
  });
})();
