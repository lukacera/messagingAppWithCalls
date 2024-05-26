import { model, Schema, Model, models } from 'mongoose';
import {MessageType} from "@/app/types/messageType"

// Schema for single message
const messageSchema: Schema<MessageType> = new Schema({
    conversationId: { type: Schema.Types.ObjectId, required: true, ref: 'Conversation' },
    senderId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    messageText: { type: String, required: true },
    sentAt: { type: Date, default: Date.now }
  });


const Message: Model<MessageType> = models.Message || model<MessageType>("Message", messageSchema);

export default Message