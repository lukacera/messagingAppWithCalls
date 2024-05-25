import { connectToDB } from "@/app/configs/db";
import bcrypt from "bcrypt"
import User from "@/app/models/User";
import { NextResponse, NextRequest } from "next/server";

// Function for loging user in
export async function POST(req: NextRequest & { body: {
  username: string,
  password: string
} }) {
    try {
        console.log(".....")
      const bodyText = await req.text();
      
      const requestBody = JSON.parse(bodyText); 
      
      const { password, username } = requestBody; // Parse the string data to JSON
      
      if (!password || !username) {
        return NextResponse.json({ error: "Missing password or username" }, {status: 400})
      }

      await connectToDB()

      const user = await User.findOne({username: username}) 
      
      // Check if user is not found in db, terminate whole process
      if (!user) {
        return NextResponse.json({ error: "User not found" }, {status: 400})
      }

      const checkPassword = bcrypt.compare(password, user.password_hash); // Compare passwords

      // If password is not correct, return status 400
      if (!checkPassword) {
          return NextResponse.json({error: "Password is incorrect"}, {status: 400})
      }

      return NextResponse.json({
        userData: {
            _id: user.id,
            username: user.username,
            contacts: user.contacts
        }
      })

    } catch (error: any) {
      return NextResponse.json({error: "Error occurred while creating new user!"})
    }
  }