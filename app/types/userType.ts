import {ObjectId} from "mongoose"

export type UserType = {
    _id?: ObjectId,
    username: string,
    password_hash: string,
    created_at: Date,
    updated_at: Date,
    contacts: ObjectId[],
    conversations: ObjectId[],
    image?: string
}