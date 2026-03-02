// This code is used to connect it to the server Redis

const Redis = require("ioredis").default;

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

redis.on("connect", () => {
    console.log("Server is connected to Redis")
});

module.exports = redis