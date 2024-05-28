import { SignJWT } from 'jose';
import { TextEncoder } from 'util';

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function generateToken(payload: { id: any; expires: Date; }) {
    // Ensure payload is an object
    if (typeof payload !== 'object' || payload === null) {
        throw new Error('Payload must be a non-null object');
    }

    // Convert the expiration time to seconds
    const expirationSeconds = Math.floor(payload.expires.getTime() / 1000);

    return await new SignJWT({ ...payload, exp: expirationSeconds })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .sign(key);
}
