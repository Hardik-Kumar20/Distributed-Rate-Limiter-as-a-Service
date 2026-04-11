const app = require("./app");
const websocket = require("./realtime/websocket.server");

async function start() {
  const port = 3000;

  await app.listen({ port });

  websocket.init(app.server);

  console.log(`🚀 Server running on port ${port}`);
}

start();
