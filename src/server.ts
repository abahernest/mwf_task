import {logger} from "./config/logger";
//Import DB
import sequelize from "./config/database.config";
import app from "./app";
import ConnectToRedis from "./config/redis.config";

require("dotenv").config();


/** Server */
const PORT: any = process.env.PORT ?? 3000;

app.listen(PORT, async() => {
    await sequelize.authenticate().then(async()=>{
        await sequelize.sync();
        logger.info("database connected")

        // Connect to redis
        ConnectToRedis.redispool.on("error", (err: any) => {
            logger.error("error connecting to redis " + err);
            throw err;
        })
        logger.info("connected to redis");
    }).catch(e=>{
        logger.error(e)
        throw e
    })
    logger.info(`server is running on port ${PORT}`)
});
