const app = require('./app');
const {initScripts} = require('./algorithms');

async function start() {
    await initScripts(); // It preload scripts

    await app.listen({ port:300 }, );
    console.log('Server is running on port 300');
}

start();
