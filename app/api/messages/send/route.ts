import User from "@/app/models/User";
import { NextResponse, NextRequest } from "next/server";

import Conversation from "@/app/models/Conversation";
import Message from "@/app/models/Message";
import { connectToDB } from "@/app/configs/db";


/*
    senderId: ObjectId;
    receiverId: ObjectId;
    messageText: string;
    sentAt: Date; // Created automatically by mongoose
    conversationId: ObjectId;
*/

interface customRequest extends NextRequest {
    decodedId: string
}

// Function for loging user in
export async function POST(req: customRequest) {
    try {
        const currentUserID = req.headers.get("id")
        const currentUser = await User.findById(currentUserID)

        if (!currentUser) {
            return NextResponse.json({ error: "User not found in DB" }, {status: 400})
        }
        const bodyText = await req.text();
        
        const requestBody = JSON.parse(bodyText);  // Parse the string data to JSON
        
        const { senderId, receiverId, messageText, conversationId } = requestBody;
        
        if (!senderId || !receiverId || !messageText) {
            return NextResponse.json({ error: "Missing info about the message!" }, {status: 400})
        }

        await connectToDB()

        // Check if sender and receiver are in db
        const sender = await User.findById(senderId) 
        if (!sender) return NextResponse.json({message: "Sender not found!"}, {status: 400})

        const receiver = await User.findById(receiverId) 
        if (!receiver) return NextResponse.json({message: "Receiver not found!"}, {status: 400})    


        // Create new conversation if it is not created already between those 2
        let conversation;
        !conversationId ? conversation = await Conversation.create({
            messages: [],
            participants: [senderId, receiverId]
        }) : conversation = await Conversation.findById(conversationId) // Else, get it from db

        const message = await Message.create({
            conversationId: conversation?.id,
            messageText: messageText,
            senderId: senderId
        })
        
      return NextResponse.json({
        message: message
      }, {status: 200})

    } catch (error: any) {
      return NextResponse.json({error: "Error occurred while logging user in!"}, {status: 400})
    }
  }