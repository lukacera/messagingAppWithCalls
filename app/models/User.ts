import { model, Schema, Model } from 'mongoose';
import {UserType} from "@/app/types/userType"

// Schema for single user
const UserSchema: Schema<UserType> = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    contacts:  [
        {
            type: Schema.ObjectId,
            ref: "User"
        }
    ]
  });


const userModel: Model<UserType> = model<UserType>("User",UserSchema );

export default userModel