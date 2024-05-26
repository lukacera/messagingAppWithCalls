import { model, Schema, Model, models } from 'mongoose';
import {ConversationType} from "@/app/types/conversationType"

// Schema for conversation; it accepts both group chats and chats between 2 people
const ConversationSchema: Schema<ConversationType> = new Schema({
    participants: [{type: Schema.ObjectId, ref:"User",  minlength: 2, required: true}], // Minimum of 2 people can be in chat
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Conversation: Model<ConversationType> = models.Conversation || model<ConversationType>("Conversation", ConversationSchema );

export default Conversation