// store/memory.store.js

const StoreInterface = require("./store.interface");

class MemoryStore extends StoreInterface {
  constructor() {
    super();

    this.storage = new Map();
  }

  async loadScript(name, script) {
    this.storage.set(name, script);
  }

  async executeScript(name, keys = [], args = []) {
    console.log(
      `Executing ${name} in memory mode`
    );

    return {
      allowed: true,
      remaining: 999,
      resetTime: Date.now() + 60000,
    };
  }

  async healthCheck() {
    return true;
  }
}

module.exports = new MemoryStore();