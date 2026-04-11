const { broadcast } = require("./websocket.server");

function publish(event, data) {
    broadcast({
        event,
        data
    });
}

module.exports = { publish };