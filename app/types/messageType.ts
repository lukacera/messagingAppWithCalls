import { ConversationType } from "./conversationType"
import { UserType } from "./userType"

export type MessageType = {
    senderId: UserType,
    receiverId: UserType,
    messageText: string,
    sentAt: Date,
    conversationId: ConversationType
}