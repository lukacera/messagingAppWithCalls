import {ObjectId} from "mongoose"
export type CallType = {
    conversationId: ObjectId,
    senderId: ObjectId,
    recieverId: ObjectId,
    callType: "audio" | "video",
    callStatus: "ongoing" | "completed" | "missed"
}