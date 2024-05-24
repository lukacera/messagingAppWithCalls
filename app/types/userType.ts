import {ObjectId} from "mongoose"

export type UserType = {
    username: string,
    password_hash: string,
    created_at: Date,
    updated_at: Date,
    contacts: ObjectId[]
    
}