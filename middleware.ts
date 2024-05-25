import jwt from 'jsonwebtoken';

import User from "./app/models/User";
import { NextRequest, NextResponse } from "next/server";
import {UserType} from "@/app/types/userType"

interface customRequest extends NextRequest {
    user: UserType
}

// Protects route, so only signed User can access it
export async function middleware(req: customRequest) {
    
    /*
        Extract token from Authorization header, if it exists
        Authorization: Bearer <JWT>
    */
    console.log("Middleware")
    const token = req.headers.get("Authorization")?.startsWith("Bearer ") ? req.headers.get("Authorization")?.split(" ")[1] : undefined;
    if (!token) {
        // No token provided
        return NextResponse.json({message: "Token not found!"}, {status: 401});
    }

    try {
        // Verify token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");

        // Get user from token's Payload, exclude password from result
        const user = await User.findById(decoded.id)
            .select("-password")

        if (!user) {
            throw new Error("User not found");
        }

        // Attach user information to the req object
        req.user = user;

        return NextResponse.next()
    } catch (error) {
        return NextResponse.json({message: "Not authorized!"}, {status: 401});
    }
};

export const config = {
    matcher: '/api/:path*',
};