import { UserType } from "./userType"
import { ConversationType } from "./conversationType"
export type CallType = {
    conversationId: ConversationType,
    senderId: UserType,
    recieverId: UserType,
    callType: "audio" | "video",
    callStatus: "ongoing" | "completed" | "missed"
}