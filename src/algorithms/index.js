// ONLY ONE JOB:

// Tell the system:
// - which algorithms exist
// - where their Lua files are

// It should NOT:

// connect Redis
// load scripts
// execute scripts
// format responses

// Those belong elsewhere.



const path = require("path");

module.exports = {
  "fixed-window": {
    file: path.join(__dirname, "fixed-window.lua"),
  },
  "sliding-window": {
    file: path.join(__dirname, "slidingWindow.lua"),
  },
  "leaky-bucket": {
    file: path.join(__dirname, "leaky-bucket.lua"),
  },
  "sliding-counter": {
    file: path.join(__dirname, "sliding-counter.lua"),
  },
  "token-bucket": {
    file: path.join(__dirname, "tokenBucket.lua")
  }
}