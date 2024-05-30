import { UserType } from "./userType";
import { MessageType } from "./messageType";

export interface ConversationType {
  participants: UserType[];
  messages: MessageType[];
  createdAt: Date;
  updatedAt: Date;
}