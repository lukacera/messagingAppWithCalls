import { model, Schema, Model, models } from 'mongoose';
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


const Call: Model<CallType> = models.Call || model<CallType>("Call", callSchema);

export default Call