const app = require("./app");
const redisStore = require("./store/redis.store");

async function bootstrap() {

    await redisStore.connect();

    app.listen(3000, () => {
        console.log(
            "Server running on port 3000"
        );
    });
}

bootstrap();