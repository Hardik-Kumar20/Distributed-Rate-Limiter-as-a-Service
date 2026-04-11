const websocket = require("ws");

let wss;

function init(server) {
    wss = new websocket.Server({ server });

    wss.on("connection", (ws) => {
        console.log("Dashboard connected");
    });
}

function  broadcast(message) {
    if (!wss) return;

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

module.exports = { init, broadcast };