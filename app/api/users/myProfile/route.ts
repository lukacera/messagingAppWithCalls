import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

// This route returns data about user that is currently logged in
export const GET = async (req: NextRequest) => {
    try {
        const currentUserID = req.headers.get("id")
        const currentUser = await User.findById(currentUserID)
        .select("-password_hash -created_at -updated_at"); // Exclude those fields from data that is returned to FE
        
        return NextResponse.json({
            data: currentUser
        }, {status: 200})
    } catch (error) {
        return NextResponse.json(
            {message: "Error occured while fetching current user's data!"}, 
            {status: 500} // Error occured, 500 status
        ) 
    }
}