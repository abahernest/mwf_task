import User from "../models/user.model";
import {logger} from "../config/logger";
require('dotenv').config()

// interfaces
import {controllerOutput} from "../interfaces/interface"

// Utils
import {hash, generateJwtToken} from "../utils/auth.helper";

export const Signup = async (data: any):Promise<controllerOutput> => {
    try{
        // hash password
        const hashedPassword = await hash(data.password);
        data.password = hashedPassword;  
        data.email = data.email.toLowerCase()

        // check if user already exists
        let user = await User.findOne({where:{email:data.email}});
        if (user) {
            const err = Error("bad request")
            return {
                code: 400,
                data: {
                    message: "User already exists",
                    error: err
                }
            }
        }

        user = await User.create(data);
        
        // generate auth token
        const authToken = generateJwtToken({email: user.email, fullname: user.fullname});

        return {
            code:200,
            data:{
                user:user,
                token: authToken
            }}
    }catch(e){
        logger.error(e);
        return {
            code:500,
            data:{
                message: "internal server error",
                error: e
        }}
    }
}