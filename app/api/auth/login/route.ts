import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";




export async function POST(request: Request) {
    await connectDB()
    const secret = process.env.JWT;

    if (!secret) {
        throw new Error("JWT is not defined");
    }

    const { email, password } = await request.json()

    if (!email || !password) {
        return Response.json({
            message: "Bad Request"
        },
            {
                status: 400
            });
    }

    const existingUser = await User.findOne({
        email: email
    })

    if (existingUser) {

        const check = await bcrypt.compare(password, existingUser.password)

        if (check) {
            //give jwt token and return success
            const token = jwt.sign(
                { userId: existingUser._id.toString() },
                secret,
                { expiresIn: "1d" }
            );

            const cookieStore = await cookies()

            cookieStore.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24,
                path: "/",
            });

            return Response.json({
                message: "You can Login",
            })
        }


        return Response.json({
            message: "Invalid Email or Password",
        },
            {
                status: 401
            }
        )
    }

    return Response.json({
        message: "Invalid Email or Password"
    },
        {
            status: 401
        })
}