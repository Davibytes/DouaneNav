import './src/infrastructure/config/environment.js';
import { createServer } from 'node:http';
import { createApp } from './src/app.js';

const port = Number(process.env.PORT || 5000);
const app = createApp();
const server = createServer(app);

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Stop the existing DouaneNav API process or start this instance with PORT=<another-port>.`);
    process.exitCode = 1;
    return;
  }
  throw error;
});

server.listen(port, () => {
  console.log(`DouaneNav API listening on http://localhost:${port}`);
});
