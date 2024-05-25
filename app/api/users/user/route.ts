import { connectToDB } from "@/app/configs/db";
import bcrypt from "bcrypt"
import User from "@/app/models/User";
import { NextResponse, NextRequest } from "next/server";

// Function for getting user from DB
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

      // Generate salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt)

      // Create a new user in the database
      const user = await User.create({
        contacts: [],
        password_hash: hashedPassword,
        username: username
      });
  
      // Return the created user
      return NextResponse.json({user: user}, {status: 200})
    } catch (error: any) {
      if (error.code === 11000) {
        // This is the MongoDB error code for a duplicate key
        return NextResponse.json({ error: "Username is already taken" }, { status: 400 });
    }
      return NextResponse.json({error: "Error occurred while creating new user!"})
    }
  }