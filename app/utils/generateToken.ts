import {ObjectId} from "mongoose"
import jwt from 'jsonwebtoken';

// @desc Function that generates JWT token
export const generateToken = (id: ObjectId) => {
    return  jwt.sign({ id }, process.env.JWT_SECRET || "", {
        expiresIn: "1d" })
}