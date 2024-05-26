import {ObjectId} from "mongoose"

export type MessageType = {
    senderId: ObjectId,
    messageText: string,
    sentAt: Date,
    conversationId: ObjectId
}