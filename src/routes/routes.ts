import express from 'express';
import {logger} from '../config/logger';

import { Request, Response, NextFunction } from 'express';
const router = express.Router();
//validators
import {validateSignup} from "../validators/auth.validators"
//controllers
import {Signup} from '../controllers/auth.controllers';
// middleware
import rateLimiter from "../middlewares/rateLimiter";

router.post('/signup',validateSignup, rateLimiter, async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const controllerOutput = await Signup(req.body)
        return res.status(controllerOutput.code).json(controllerOutput)
    }catch(e){
        logger.error(e);
        next();
        return res.status(500).json({
            code:500,
            data:{
                message:"internal server error",
                error:e
            }
        })
    }   
});


export = router;