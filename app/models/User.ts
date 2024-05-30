import { model, Schema, Model, models } from 'mongoose';
import { UserType } from "@/app/types/userType";

// Schema for single user
const UserSchema: Schema<UserType> = new Schema({
    username: { type: String, required: true, unique:true },
    password_hash: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    contacts:  [
        {
            type: Schema.ObjectId,
            ref: "User"
        }
    ],
    conversations: [
        {
            type: Schema.ObjectId,
            ref: "Conversation"
        }
    ]
});

// Ensure that user model is compiled only once, to prevent the error
const User: Model<UserType> = models.User || model<UserType>("User", UserSchema);

export default User;