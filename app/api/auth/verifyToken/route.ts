import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

// Checks if token is valid(for client side, middleware is taking care of SS)
export async function POST(req: NextRequest) {
    const bodyText = await req.text();
    const requestBody = JSON.parse(bodyText);
    const { token } = requestBody; 

    console.log(bodyText)
    if (!token) {
        console.log("Token not found")
        return NextResponse.json({ valid: false, message: 'Token not found' }, { status: 400 });
    }
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

        if (!payload) {
            console.log("Payload not found")
            return NextResponse.json({ valid: false, message: 'Invalid token payload' }, { status: 401 });
        }

        return NextResponse.json({ valid: true, decoded: payload }, { status: 200 });
    } catch (error) {
        console.log("Invalid token")
        return NextResponse.json({ valid: false, message: 'Invalid token' }, { status: 401 });
    }
}
