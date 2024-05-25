import bcrypt from "bcrypt"
import User from "@/app/models/User";
import { NextResponse, NextRequest } from "next/server";
import { generateToken } from "@/app/utils/generateToken";
import {MessageType} from "@/app/types/messageType"


/*
    senderId: ObjectId;
    receiverId: ObjectId;
    messageText: string;
    sentAt: Date; // Created automatically by mongoose
    conversationId: ObjectId;
*/

// Function for loging user in
export async function POST(req: NextRequest & { body: {
  username: string,
  password: string
} }) {
    try {
      const bodyText = await req.text();
      
      const requestBody = JSON.parse(bodyText); 
      
      const { password, username } = requestBody; // Parse the string data to JSON
      
      if (!password || !username) {
        return NextResponse.json({ error: "Missing password or username" }, {status: 400})
      }


      const user = await User.findOne({username: username}) 
  
      // Check if user is not found in db, terminate whole process
      if (!user) {
        return NextResponse.json({ error: "User not found" }, {status: 400})
      }

      const checkPassword = await bcrypt.compare(password, user.password_hash); // Compare passwords

      // If password is not correct, return status 400
      if (!checkPassword) {
          return NextResponse.json({error: "Password is incorrect"}, {status: 400})
      }

      
      return NextResponse.json({
        userData: {
            _id: user.id,
            username: user.username,
            contacts: user.contacts,
            token: generateToken(user.id)
        }
      }, {status: 200})

    } catch (error: any) {
      return NextResponse.json({error: "Error occurred while logging user in!"})
    }
  }