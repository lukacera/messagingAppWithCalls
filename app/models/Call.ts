import { model, Schema, Model } from 'mongoose';
import {CallType} from "@/app/types/callType"

// Schema for calls; both audio & video
const callSchema = new Schema<CallType>({
    callStatus: {
        type: String,
        required: true
    },
    callType: {
        type: String,
        required: true
    },
    conversationId:  {
        type: Schema.ObjectId,
        ref: "Conversation"
    },
    recieverId:  {
        type: Schema.ObjectId,
        ref: "User"
    },
    senderId:  {
        type: Schema.ObjectId,
        ref: "User"
    }

})


const commentModel: Model<CallType> = model<CallType>("Call", );

export default commentModel