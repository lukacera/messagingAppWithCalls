import { NextRequest, NextResponse } from "next/server";
import {jwtVerify} from "jose"

export async function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;

    // Exclude /api/auth/* routes
    if (pathname.startsWith('/api/auth')) {
      return NextResponse.next();
    }

    // Extract token from Authorization header, if it exists
    const authHeader = req.headers.get("Authorization");
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    
    if (!token) {
      return NextResponse.json({ message: "Token not found!" }, { status: 401 });
    }

    const { payload }:any = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || ""));

    if (!payload) {
      return NextResponse.json({ message: "Invalid token payload!" }, { status: 401 });
    }

    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('id', payload.id)

    // You can also set request headers in NextResponse.rewrite
    return NextResponse.next({
        request: {
            headers: requestHeaders
        }
    })
  } catch (error: any) {
    console.error("Error in middleware:", error);
    return NextResponse.json(
        { message: "Not authorized!", error: error.message }, 
        { status: 401 }
    );
  }
}

export const config = {
  matcher: '/api/:path*',
};
