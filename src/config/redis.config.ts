import Redis from "ioredis";

// Instantiate redis
class ConnectToRedis {
    static redispool = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port:6379,
        password: process.env.REDIS_PASSWORD || '',
        db:0
    });
}

export default ConnectToRedis;