const app = require('./app');
const { initScripts } = require('./algorithms');

async function start() {
  const port = 3000;

  await initScripts();

  await app.listen({ port });

  console.log(`🚀 Server running on port ${port}`);
}

start();