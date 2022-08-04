import * as yup from "yup";
import { Request, Response, NextFunction } from 'express';
import { controllerOutput } from "../interfaces/interface";


export const validateSignup = (req:Request,res:Response,next:NextFunction)=>{
    let schema = yup.object().shape({
        email: yup.string().email().required("email is required"),
        fullname: yup.string().min(2).max(60).required("fullname is required"),
        password: yup.string().required("password is required").matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
    })  

    schema.validate(req.body).then(response=>{
        next();
    }).catch((error)=>{
        const err = new Error("User already exists");
        return res.status(412).json({
            code:412,
            data:{
                message:error.message,
                error:err
            }
        })
    })
}
