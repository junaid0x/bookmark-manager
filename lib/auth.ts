import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserId() {
    const secret = process.env.JWT;

    if (!secret) {
        throw new Error("JWT is not defined");
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return null
    }
    

    try {
        const decoded = jwt.verify(token, secret)

        if(typeof decoded === "object" && decoded !== null && "userId" in decoded){
            return decoded.userId;
        }

        return null;

    } catch (error) {
        return null
    }
}