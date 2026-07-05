// Purpose:

// define a common API for all stores.

// This allows:

// Redis store
// memory store
// future cluster store


class StoreInterface {
    async loadScript(name, script){
        throw new Error("loadScript() not implemented");
    }

    async executeScript(name, keys = [], args = []) {
        throw new Error("executeScript() not implemented");
    }

    async healthCheck() {
        throw new Error("healthCheck() not implemented");
    }
}

module.exports = StoreInterface;
