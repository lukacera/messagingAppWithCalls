import {ObjectId} from "mongoose"

export type MessageType = {
    senderId: ObjectId,
    receiverId: ObjectId,
    messageText: string,
    sentAt: Date,
    conversationId: ObjectId
}