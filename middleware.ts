import jwt from 'jsonwebtoken';

import { NextRequest, NextResponse } from "next/server";


interface customRequest extends NextRequest {
    decodedId: string
}

// Protects route, so only signed User can access it
export async function middleware(req: customRequest) {
    const { pathname } = req.nextUrl;

    // Exclude /api/auth/* routes
    if (pathname.startsWith('/api/auth')) {
        return NextResponse.next();
    }
    console.log("Run middleware")

    /*
        Extract token from Authorization header, if it exists
        Authorization: Bearer <JWT>
    */
    const token = req.headers.get("Authorization")?.startsWith("Bearer ") ? req.headers.get("Authorization")?.split(" ")[1] : undefined;
    if (!token) {
        // No token provided
        return NextResponse.json({message: "Token not found!"}, {status: 401});
    }

    try {
        // Verify token and put it on request
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
        
        req.decodedId = decoded.id

        return NextResponse.next()
    } catch (error) {
        return NextResponse.json({message: "Not authorized!"}, {status: 401});
    }
};

export const config = {
    matcher: '/api/:path*',
}