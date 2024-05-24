import {ObjectId} from "mongoose"

export interface ConversationType {
  participants: ObjectId[];
  messages: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}