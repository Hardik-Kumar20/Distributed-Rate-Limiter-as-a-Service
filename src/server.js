const app = require("./app");

async function start() {
  const port = 3000;

  await app.listen({ port });

  console.log(`🚀 Server running on port ${port}`);
}

start();