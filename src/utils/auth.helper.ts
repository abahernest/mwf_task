import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import {jwtPayload} from "../interfaces/interface";

export function generateJwtToken(data: jwtPayload) {
    return jwt.sign(
        data,
        process.env.JWT_SECRET,
        { expiresIn: 24*60*60 },
    );
}

export async function hash(param: string) {
    return bcrypt.hash(param, 10);
}

export async function verifyHash(param: string, hashedPram: string) {
    return bcrypt.compare(param, hashedPram);
}
