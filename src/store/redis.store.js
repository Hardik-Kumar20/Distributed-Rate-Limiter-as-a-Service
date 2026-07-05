const {createClient} = require("redis");
const fs = require("fs");
const path = require("path");
const algorithms = require("../algorithms")

const StoreInterface = require("./store.interface");

class RedisStore extends StoreInterface{
    constructor() {
        super();

        this.client = createClient({
            url: "redis://127.0.0.1:6379"
        })

        this.scriptShas = {};

        this.client.on("connect", () => {
            console.log("Connected to Redis");
        });

        this.client.on("error", (err) => {
            console.error("Redis error:", err.message);
        });

    }

    async connect() {
        await this.client.connect();
        await this.loadAllScripts();
    }

    //Loading lua scripts into redis 
    async loadScript(name, filePath) {
        const script = fs.readFileSync(
        path.resolve(filePath),
        "utf8"
        );

        const sha = await this.client.scriptLoad(
            script
        );

        this.scriptShas[name] = sha;

        console.log(`Loaded script: ${name}`)
    }


    // Executing loaded lua script 
    async executeScript(name, keys = [], args = []){
        console.log("REDIS STORE EXECUTESCRIPT CALLED");

        const sha = this.scriptShas[name];

        if(!sha) {
            throw new Error(`Script not loaded: ${name}`);
        }

        const result = await this.client.evalSha(
            sha,
            {
                keys,
                arguments: args.map(String),
            }
        );

        return {
            allowed: result[0] === 1,
            remaining: result[1],
            resetTime: result[2],
        };
    }

    async healthCheck() {
        const response = await this.client.ping();

        return response === "PONG";
    }






    async loadAllScripts() {
        //Loop through all algorithms --> call this function --> Save SHA hashses
    
        console.log("Loading lua scripts ...");
    
        for(const [name, config] of Object.entries(algorithms)){
            await this.loadScript(
                name,
                config.file
            );
        }
        console.log(`Loaded ${Object.keys(this.scriptShas).length} scripts`);
    }



    async get(key) {
        return this.client.get(key);
    }
    
    async set(key, value) {
        return this.client.set(key, value);
    }
}




module.exports = new RedisStore();