import {ObjectId} from "mongoose"
import { ConversationType } from "./conversationType"

export type UserType = {
    _id?: ObjectId,
    username: string,
    password_hash: string,
    created_at: Date,
    updated_at: Date,
    contacts: UserType[],
    conversations: ConversationType[],
    image?: string
}