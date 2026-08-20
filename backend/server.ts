import { app } from './app';
import { config } from './config/env';

const server = app.listen(config.port, () => {
  console.log(`🚀 Mindstocs Studio Backend server listening on port ${config.port} (${config.nodeEnv})`);
});

export const startServer = () => server;

export default server;
