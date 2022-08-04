import { Request, Response, NextFunction } from 'express';

import {logger} from '../config/logger';
import ConnectToRedis from '../config/redis.config';

const redis = ConnectToRedis.redispool;

const rateLimiter = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {email} = req.body
        if (email){
            const requestCounterKey = `COUNTER-${email}`
            const redis_response = await redis.get(requestCounterKey)
            if (!redis_response) {
                await redis.set(requestCounterKey,email)
                //set expiry to 2seconds
                await redis.expire(requestCounterKey,2)
                
            }else{
                const err = Error("bad request")
                return res.status(429).json({
                    code:420,
                    data:{
                        message:"request already processing",
                        error:err
                    }
                });
            }
        }
        next();
    }catch(e){
        logger.error(e)
        return {
            code:500,
            data:{
                message: "internal server error",
                error: e
        }}
    }
}

export default rateLimiter;
